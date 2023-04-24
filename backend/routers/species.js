// import dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

// import models
const { User } = require("../models/user");
const { Specie } = require("../models/specie");
const { Category } = require("../models/category");

// import authenticate file
const authUser = require("../helpers/jwtUser");

// files extensions
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];

    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// paths
// read path to get a list of species
router.get(`/`, async (req, res) => {

  const specieList = await Specie.find().populate("category").populate("user");

  if (!specieList) {
    res.status(500).json({ success: false });
  }

  res.send(specieList);
});

// read path to get a list of species filtered by the category
router.get(`/categoriesFilter`, async (req, res) => {
  let filter = {};

  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const specieList = await Specie.find(filter).populate("category").populate("user");

  if (!specieList) {
    res.status(500).json({ success: false });
  }

  res.send(specieList);
});

// read path to get a list of species filtered by the user
router.get(`/usersFilter`, async (req, res) => {
  let filter = {};

  if (req.query.users) {
    filter = { user: req.query.users.split(",") };
  }

  const specieList = await Specie.find(filter).populate("category").populate("user");

  if (!specieList) {
    res.status(500).json({ success: false });
  }

  res.send(specieList);
});

// read path to get a specie by id
router.get(`/:id`, async (req, res) => {
  const specie = await Specie.findById(req.params.id).populate("category").populate("user");

  if (!specie) {
    res.status(500).json({ success: false });
  }

  res.send(specie);
});

// read path to get the total count of species in the database
router.get(`/get/count`, async (req, res) => {
  const specieCount = await Specie.countDocuments();

  if (!specieCount) {
    res.status(500).json({ success: false });
  }

  res.send({
    specieCount: specieCount,
  });
});

// read path to get the verified species
router.get(`/get/verified`, async (req, res) => {
  const count = req.query.count ? req.query.count : 0;
  const species = await Specie.find({ isVerified: true }).limit(+count);

  if (!species) {
    res.status(500).json({ success: false });
  }

  res.send(species);
});

// write path to add new species
router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(400).send("invalid category");
  }

  const file = req.file;

  if (!file) {
    return res.status(400).send("no image in the request");
  }

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;

  let specie = new Specie({
    scientific_name: req.body.scientific_name,
    common_name: req.body.common_name,
    description: req.body.description,
    category: req.body.category,
    user: req.body.user,
    division: req.body.division,
    family: req.body.family,
    gender: req.body.gender,
    state_conservation: req.body.state_conservation,
    image: `${basePath}${fileName}`,
    isVerified: req.body.isVerified,
  });

  specie = await specie.save();

  if (!specie) {
    return res.status(500).send("the specie cannot be created");
  }

  return res.send(specie);
});

// put path to update a specie by id
router.put("/:id", authUser(), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid specie ID");
  }

  let updatedData = {
    scientific_name: req.body.scientific_name,
    common_name: req.body.common_name,
    description: req.body.description,
    user: req.body.user,
    division: req.body.division,
    family: req.body.family,
    gender: req.body.gender,
    state_conservation: req.body.state_conservation,
    image: req.body.image,
    isVerified: req.body.isVerified,
  };

  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).send("invalid category");
    }
    updatedData.category = req.body.category;
  }

  const specie = await Specie.findByIdAndUpdate(req.params.id, updatedData, { new: true });

  if (!specie) {
    return res.status(500).send("the specie cannot be updated!");
  }

  res.send(specie);
});

// put path to update the array images
router.put(
  "/gallery-images/:id",
  authUser(),
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid specie ID");
    }

    const files = req.files;

    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].filename;
        imagesPaths.push(`${basePath}${fileName}`);
      }
    }

    const specie = await Specie.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!specie) {
      return res.status(500).send("the specie cannot be updated!");
    }

    res.send(specie);
  }
);

// delete path to delete a specie
router.delete("/:id", authUser(), async (req, res) => {
  Specie.findByIdAndRemove(req.params.id)
    .then((specie) => {
      if (specie) {
        return res
          .status(200)
          .json({ success: true, message: "the specie is delated" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "specie not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
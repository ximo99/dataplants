// import dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

// import models
const { User } = require("../models/user");
const { Post } = require("../models/post");
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
// read path to get a list of posts
router.get(`/`, async (req, res) => {
  const postList = await Post.find().populate("specie").populate("user");

  if (!postList) {
    res.status(500).json({ success: false });
  }

  res.send(postList);
});

// read path to get a list of species filtered by the specie
router.get(`/speciesFilter`, async (req, res) => {
  let filter = {};

  if (req.query.species) {
    filter = { specie: req.query.species.split(",") };
  }

  const postList = await Post.find(filter)
    .populate("specie")
    .populate("user");

  if (!postList) {
    res.status(500).json({ success: false });
  }

  res.send(postList);
});

// read path to get a list of species filtered by the user
router.get(`/usersFilter`, async (req, res) => {
  let filter = {};

  if (req.query.users) {
    filter = { user: req.query.users.split(",") };
  }

  const postList = await Post.find(filter)
    .populate("category")
    .populate("user");

  if (!postList) {
    res.status(500).json({ success: false });
  }

  res.send(postList);
});

// read path to get a post by id
router.get(`/:id`, async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("category")
    .populate("user");

  if (!post) {
    res.status(500).json({ success: false });
  }

  res.send(post);
});

// read path to get the total count of posts in the database
router.get(`/get/count`, async (req, res) => {
  const postCount = await Post.countDocuments();

  if (!postCount) {
    res.status(500).json({ success: false });
  }

  res.send({
    postCount: postCount,
  });
});

// read path to get the verified posts
router.get(`/get/verified`, async (req, res) => {
  const count = req.query.count ? req.query.count : 0;
  const posts = await Post.find({ isVerified: true }).limit(+count);

  if (!posts) {
    res.status(500).json({ success: false });
  }

  res.send(posts);
});

// write path to add new posts
router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const specie = await Specie.findById(req.body.specie);

  if (!specie) {
    return res.status(400).send("invalid specie");
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).send("invalid user");
  }

  const file = req.file;

  if (!file) {
    return res.status(400).send("no image in the request");
  }

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;

  let post = new Post({
    specie: req.body.specie,
    description: req.body.description,
    user: req.body.user,
    location: req.body.location,
    image: `${basePath}${fileName}`,
  });

  post = await post.save();

  if (!post) {
    return res.status(500).send("the post cannot be created");
  }

  return res.send(post);
});

// put path to update a post by id
router.put("/:id", authUser(), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid post ID");
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

  const post = await Post.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });

  if (!post) {
    return res.status(500).send("the post cannot be updated!");
  }

  res.send(post);
});

// put path to update the array images
router.put(
  "/gallery-images/:id",
  authUser(),
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid post ID");
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

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!post) {
      return res.status(500).send("the post cannot be updated!");
    }

    res.send(post);
  }
);

// delete path to delete a post
router.delete("/:id", authUser(), async (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then((post) => {
      if (post) {
        return res
          .status(200)
          .json({ success: true, message: "the post is delated" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "post not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

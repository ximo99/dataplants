// import dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

// import files
const { Category } = require("../models/category");
const { Product } = require("../models/product");

const authJwt = require("../helpers/jwt");

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
// read path to get a list of products and can be filtered by category
router.get(`/`, async (req, res) => {
  let filter = {};

  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }

  res.send(productList);
});

// read path to get a product by id
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }

  res.send(product);
});

// write path to get the total count of products in the database
router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }

  res.send({
    productCount: productCount,
  });
});

// write path to get the featured products
router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }

  res.send(products);
});

// write path to add new products
router.post(`/`, uploadOptions.single("image"), authJwt(), async (req, res) => {
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

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) {
    return res.status(500).send("the product cannot be created");
  }

  return res.send(product);
});

// put path to update a product by id
router.put("/:id", async (req, res) => {
  console.log("ENTERING")
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid product ID");
  }

  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(400).send("invalid category");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) {
    return res.status(500).send("the product cannot be updated!");
  }

  res.send(product);
});

// put path to update the array images
router.put(
  "/gallery-images/:id",
  authJwt(),
  uploadOptions.array("images", 10),
  authJwt(),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid product ID");
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

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!product) {
      return res.status(500).send("the product cannot be updated!");
    }

    res.send(product);
  }
);

// delete path to delete a product
router.delete("/:id", authJwt(), async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is delated" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

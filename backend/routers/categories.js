// import dependencies
const express = require("express");
const router = express.Router();

// import files
const { Category } = require("../models/category");
const auth = require("../helpers/jwt");

// paths
// read path to get a list of categories
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }

  res.status(200).send(categoryList);
});

// read path to get a category by id
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res
      .status(500)
      .json({ message: "the category with the given ID was not found" });
  }

  res.status(200).json(category);
});

// write path to add new categories
//router.post("/", auth(), async (req, res) => {
router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  try {
    category = await category.save();

    if (!category) {
      return res
        .status(404)
        .send({ message: "the category cannot be created!" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message, error: err });
  }
});

// path to update a category by id
//router.put("/:id", auth(), async (req, res) => {
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).send({ message: "the category cannot be created!" });
  }

  res.json(category);
});

// delete path to delete a category
//router.delete("/:id", auth(), async (req, res) => {
router.delete("/:id", async (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is delated" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

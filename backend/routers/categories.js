// import dependencies
const express = require("express");
const router = express.Router();

// import files
const { Category } = require("../models/category");
const authAdmin = require("../helpers/jwt");

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

  res.status(200).send(category);
});

// write path to add new categories
router.post("/", authAdmin(), async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category) {
    return res.status(404).send("the category cannot be created!");
  }

  res.send(category);
});

// path to update a category by id
router.put("/:id", authAdmin(), async (req, res) => {
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
    return res.status(404).send("the category cannot be created!");
  }

  res.send(category);
});

// delete path to delete a category
router.delete("/:id", authAdmin(), async (req, res) => {
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

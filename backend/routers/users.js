// import dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import files
const { User } = require("../models/user");
const authJwt = require("../helpers/jwt");

// defining .env configuration file variables
require("dotenv/config");
const secret = process.env.SECRET;
const port = process.env.PORT;

// paths
// read path to get a list of users
router.get(`/`, authJwt(), async (req, res) => {
  // if .select('-field') is included, this field does not appear in the request
  // if .select('field1 field2'), these fields are the only ones that appear in the request
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

// read path to get a user by id
router.get("/:id", authJwt(), async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    return res
      .status(500)
      .json({ message: "the user with the given ID was not found" });
  }

  res.status(200).send(user);
});

// write path to get the total count of users in the database
router.get(`/get/count`, authJwt(), async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.send({ userCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// write path to add new users
router.post("/", authJwt(), async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();

  if (!user) {
    return res.status(404).send("the user cannot be created!");
  }

  res.send(user);
});

// write path to login the users
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("the user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("password is wrong");
  }
});

// write path to register the users
router.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();

  if (!user) {
    return res.status(404).send("the user cannot be created!");
  }

  res.send(user);
});

// update path of a password user by id
router.put("/:id", authJwt(), async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword;

  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      passwordHash: newPassword,
      name: req.body.name,
      phone: req.body.phone,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).send("the user cannot be created!");
  }

  res.send(user);
});

// delete path to delete a user
router.delete("/:id", authJwt(), async (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is delated" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

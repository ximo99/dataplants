// import dependencies
const mongoose = require("mongoose");

// mongoose schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "",
  },
  profession: {
    type: String,
    default: "",
  },
  photoUser: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// add a virtual property called "id" to the userSchema, this virtual property returns the user's _id value as a hexadecimal string
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// configure the userSchema's toJSON method to include virtual properties
userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);

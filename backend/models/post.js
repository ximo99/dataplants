// import dependencies
const mongoose = require("mongoose");
const { Specie } = require("./specie");
const { User } = require("./user");

// mongoose schema
const specieSchema = mongoose.Schema({
  specie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// add a virtual property called "id" to the postSchema, this virtual property returns the post's _id value as a hexadecimal string
postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// configure the speciesSchema's toJSON method to include virtual properties
postSchema.set("toJSON", {
  virtuals: true,
});

exports.Post = mongoose.model("Post", postSchema);
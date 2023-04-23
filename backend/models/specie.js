// import dependencies
const mongoose = require("mongoose");

// import other routers
const { User } = require("./user");
const { Category } = require("./category");

// mongoose schema
const specieSchema = mongoose.Schema({
  scientific_name: {
    type: String,
    required: true,
  },
  common_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  division: {
    type: String,
    required: true,
    default: "",
  },
  family: {
    type: String,
    required: true,
    default: "",
  },
  gender: {
    type: String,
    required: true,
    default: "",
  },
  state_conservation: {
    type: String,
    required: true,
    default: "",
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
  isVerified: {
    type: String,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// add a virtual property called "id" to the specieSchema, this virtual property returns the specie's _id value as a hexadecimal string
specieSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// configure the speciesSchema's toJSON method to include virtual properties
specieSchema.set("toJSON", {
  virtuals: true,
});

exports.Specie = mongoose.model("Specie", specieSchema);
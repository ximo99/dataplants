// import dependencies
const mongoose = require("mongoose");

// mongoose schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

exports.Category = mongoose.model("Category", categorySchema);
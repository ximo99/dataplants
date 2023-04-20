// import dependencies
const mongoose = require("mongoose");

// mongoose schema
const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

// add a virtual property called "id" to the orderItemSchema, this virtual property returns the order item's _id value as a hexadecimal string
orderItemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// configure the orderItemSchema's toJSON method to include virtual properties
orderItemSchema.set("toJSON", {
  virtuals: true,
});

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);

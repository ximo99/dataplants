// import dependencies
const express = require("express");
const router = express.Router();

// import files
const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const authJwt = require("../helpers/jwt");

// paths
// read path to get a list of orders
router.get(`/`, authJwt(), async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }

  res.send(orderList);
});

// read path to get a order by id
router.get(`/:id`, authJwt(), async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

  if (!order) {
    res.status(500).json({ success: false });
  }

  res.send(order);
});

// write path to get total sales value
router.get("/get/totalsales", authJwt(), async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("the irder sakes cannot be generated");
  }
  res.send({ totalSales: totalSales.pop().totalsales });
});

// write path to get the total count of order in the database
router.get(`/get/count`, authJwt(), async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.send({ orderCount: orderCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

// read path to get a list of orders
router.get(`/get/userorders/:userid`, authJwt(), async (req, res) => {
  const userOrderList = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });

  if (!userOrderList) {
    res.status(500).json({ success: false });
  }

  res.send(userOrderList);
});

// write path to add new orders
router.post("/", authJwt(), async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );

      const totalPrice = orderItem.product.price * orderItem.quantity;

      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });

  order = await order.save();

  if (!order) {
    return res.status(404).send("the order cannot be created!");
  }

  res.send(order);
});

// path to update a order by id
router.put("/:id", authJwt(), async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) {
    return res.status(404).send("the order cannot be created!");
  }

  res.send(order);
});

// delete path to delete a order
router.delete("/:id", authJwt(), (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: "the order is delated" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "order not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

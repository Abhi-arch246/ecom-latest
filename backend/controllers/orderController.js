const Order = require("../models/orderModel");

//endPoint : '/api/orders'
const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    orderAmount,
    taxPrice,
    shippingPrice,
    totalPrice,
    userId,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No orders");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      userId,
      orderAmount,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const creatingOrder = await order.save();
    res.send(creatingOrder);
    res.end();
  }
};

//endPoint : '/api/orders/myorders'
const getMyOrders = async (req, res) => {
  const myOrders = await Order.find({ user: req.user._id });
  res.send(myOrders);
};

//endPoint : '/api/orders/:id'
const getOrderById = async (req, res) => {
  const orderById = await Order.findById(req.params.id);

  if (orderById) {
    res.send(orderById);
  } else {
    res.send("Something went wrong");
  }
};

//endPoint : '/api/orders/:id/pay'
const updateOrderPay = async (req, res) => {
  res.send("Update pay");
};

//endPoint : '/api/orders/:id/deliver
const updateOrderDeliver = async (req, res) => {
  res.send("Update Deliver");
};

module.exports = {
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderPay,
  updateOrderDeliver,
};

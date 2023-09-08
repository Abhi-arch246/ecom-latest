const Order = require("../models/orderModel");

//endPoint : '/api/orders'
const addOrder = async (req, res) => {
  const {
    userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    orderAmount,
    taxPrice,
    shippingPrice,
    totalPrice,
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
    if (creatingOrder) {
      return res.send({ success: true, creatingOrder });
    } else {
      return res.send({ success: false });
    }
  }
};

//endPoint : '/api/orders/myorders'
const getMyOrders = async (req, res) => {
  const myOrders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
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
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();

    res.send(updateOrder);
  } else {
    throw new Error("Order not found");
  }
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

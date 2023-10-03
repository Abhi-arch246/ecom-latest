const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//endPoint : '/api/orders'
const addOrder = async (req, res) => {
  const {
    userId,
    userName,
    userEmail,
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
      userName,
      userEmail,
      orderAmount,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    order.orderItems.map(async (x) => {
      const pro = await Product.findById(x.product);
      pro.countInStock -= x.qty;

      pro.save();
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
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

//endPoint : '/api/orders/'
const getAllOrders = async (req, res) => {
  const allOrders = await Order.find({}).sort({ createdAt: -1 });
  res.send(allOrders);
};

module.exports = {
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderPay,
  updateOrderDeliver,
  getAllOrders,
};

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User ",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    orderAmount: {
      type: Number,
      default: 0,
      require,
    },
    taxPrice: {
      type: Number,
      default: 0,
      require,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      require,
    },
    totalPrice: {
      type: Number,
      default: 0,
      require,
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

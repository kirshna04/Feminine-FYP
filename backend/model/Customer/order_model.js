const mongoose = require("mongoose");

const order_schema = mongoose.Schema(
  {
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    seller_id: {
      type: mongoose.Types.ObjectId,
      ref: "sellerProfile",
      default: null,
    },
    order_by: { type: mongoose.Types.ObjectId, ref: "user_account" },
    quantity: { type: Number },
    totalAmount: { type: Number },
    address: { type: String },
    country: { type: String, default: null },
    city: { type: String, default: null },
    status: { type: String },
    paymentMethod: { type: String },
  },
  { timestamps: true }
);

const Order = new mongoose.model("Order", order_schema, "Order");

module.exports = Order;

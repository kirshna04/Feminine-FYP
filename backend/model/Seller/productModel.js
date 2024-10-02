const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    seller_id: { type: mongoose.Types.ObjectId, ref: "sellerProfile" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    images: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productModel, "Product");

module.exports = Product;

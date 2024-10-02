const { order_model } = require("../../model/index");
const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Utils");
const Stripe = require("stripe");

const createOrder = asyncErrorHandler(async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const {
    address,
    city,
    country,
    items,
    seller_id,
    order_by,
    quantity,
    totalAmount,
    paymentMethod,
    status,
  } = req.body;

  //   const charge = await stripe.charges.create({
  //     amount: totalAmount * 100,
  //     currency: "PKR",
  //     source: "tok_visa",
  //   });

  let create = await order_model.create({
    address,
    city,
    country,
    items,
    seller_id,
    order_by,
    quantity,
    totalAmount,
    paymentMethod,
    status,
  });
  res.status(200).json({ msg: "ORDER CREATED" });
});

const getOrderByCustomer = asyncErrorHandler(async (req, res) => {
  let getOrder = await order_model
    .find({ order_by: req.params.id })
    .populate("items.product")
    .sort({ createdAt: -1 });
  res.status(200).json(getOrder);
});

const getOrderBySeller = asyncErrorHandler(async (req, res) => {
  let getOrder = await order_model
    .find({ seller_id: req.params.id })
    // .populate("product_id")
    .populate("items.product")
    .populate("order_by")
    .sort({ createdAt: -1 });
  res.status(200).json(getOrder);
});

const getAllOrder = asyncErrorHandler(async (req, res) => {
  let getOrder = await order_model
    .find()
    .populate("seller_id")
    .populate("product_id")
    .populate("order_by")
    .sort({ createdAt: -1 });
  res.status(200).json(getOrder);
});

const updateStatus = asyncErrorHandler(async (req, res) => {
  let updateOrder = await order_model.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { $new: true }
  );
  res.status(200).json(updateOrder);
});

module.exports = {
  createOrder,
  getOrderByCustomer,
  getOrderBySeller,
  getAllOrder,
  updateStatus,
};

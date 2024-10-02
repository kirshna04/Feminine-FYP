const {
  createOrder,
  getOrderByCustomer,
  getOrderBySeller,
  getAllOrder,
  updateStatus,
} = require("../../service/Customer/order");
const {
  createStripePaymentIntent,
} = require("../../service/payment/paymentService");

const router = require("express").Router();

router.post("/stripe/payment/create", createStripePaymentIntent);

router.post("/buyer/order/create", createOrder);
router.put("/buyer/order/update/:id", updateStatus);
router.get("/buyer/get/order/all/:id", getOrderByCustomer);
router.get("/seller/get/order/all/:id", getOrderBySeller);
router.get("/admin/get/order/all", getAllOrder);

module.exports = router;

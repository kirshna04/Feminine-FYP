const multipleupload = require("../../config/multer.config");
const { authorized } = require("../../middleware/authentication/jwt");
const {
  createProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getProductBySeller,
} = require("../../service/Seller/productservice");

const router = require("express").Router();

router.post("/create/product", multipleupload.array("images"), createProduct);

router.get("/get/product", getProduct);

router.get("/get/product/:id", getSingleProduct);
router.get("/get/product/seller/:id", getProductBySeller);

router.delete("/delete/product/:id", deleteProduct);

router.put(
  "/update/product/:id",
  multipleupload.array("images"),
  updateProduct
);

module.exports = router;

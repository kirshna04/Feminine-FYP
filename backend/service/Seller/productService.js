const { uploadFiles } = require("../../config/firebase.config");
const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Utils");
const { productModel } = require("../../model");
const { statusCode } = require("../../common/api_response");

const createProduct = asyncErrorHandler(async (req, res) => {
  let { title, description, quantity, price, discount, seller_id } = req.body;
  const images = Array.isArray(req.files) ? req.files : [req.files];
  const imageUrls = await uploadFiles(images);
  let createProduct = await productModel.create({
    seller_id,
    title,
    description,
    price,
    quantity,
    discount,
    images: imageUrls,
  });
  res.status(200).json({ ...createProduct._doc });
});

const getProduct = asyncErrorHandler(async (req, res) => {
  let AllProduct = await productModel
    .find({})
    .populate("seller_id")
    .sort({ createdAt: -1 });
  if (AllProduct.length > 0) {
    res.status(200).json({ AllProduct });
  }
  throw new ErrorHandler("No Product Found", statusCode.NotFound);
});

const getSingleProduct = asyncErrorHandler(async (req, res) => {
  let SingleProduct = await productModel
    .findById(req.params.id)
    .populate("seller_id");
  if (SingleProduct) {
    res.status(200).json({ SingleProduct });
  }
  throw new ErrorHandler("No Product Found", statusCode.NotFound);
});

const getProductBySeller = asyncErrorHandler(async (req, res) => {
  let AllProduct = await productModel
    .find({ seller_id: req.params.id })
    .populate("seller_id")
    .sort({ createdAt: -1 });
  console.log(AllProduct, "AllProduct");
  if (AllProduct.length > 0) {
    res.status(200).json({ AllProduct });
  }
  throw new ErrorHandler("No Product Found", statusCode.NotFound);
});

const deleteProduct = asyncErrorHandler(async (req, res) => {
  let DeleteProduct = await productModel.findByIdAndDelete(req.params.id);
  if (DeleteProduct) {
    res.status(200).json({ msg: "Product Deleted" });
  }
  throw new ErrorHandler("No Product Found", statusCode.NotFound);
});

const updateProduct = asyncErrorHandler(async (req, res) => {
  let { title, description, quantity, price, discount } = req.body;
  const images = Array.isArray(req.files) ? req.files : [req.files];
  let find = await productModel.findById(req.params.id);

  if (find) {
    if (images.length > 0) {
      const imageUrls = await uploadFiles(images);
      let updateProduct = await productModel.findByIdAndUpdate(
        req.params.id,
        {
          title: title,
          description: description,
          price: price,
          quantity: quantity,
          discount: discount,
          images: imageUrls,
        },
        { new: true }
      );
      res.status(200).json({ updateProduct });
    } else {
      let updateProduct = await productModel.findByIdAndUpdate(
        req.params.id,
        { title, description, price, quantity, discount },
        { new: true }
      );
      res.status(200).json({ updateProduct });
    }
  } else {
    throw new ErrorHandler("No Product Found", statusCode.NotFound);
  }
});
module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getProductBySeller,
};

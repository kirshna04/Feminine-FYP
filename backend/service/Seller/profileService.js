const { uploadSingleFile } = require("../../config/firebase.config");
const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Utils");
const { seller_profile_model, user_account_model } = require("../../model");
const { api_messages, statusCode } = require("../../common/api_response");
const { productModel, order_model } = require("../../model");

const updateProfile = asyncErrorHandler(async (req, res) => {
  let { name, email, country, city } = req.body;
  let { accountId } = req.params;
  let image = req.file;
  if (image) {
    let imageUrl = await uploadSingleFile(image);
    let updateProfile = await seller_profile_model.findOneAndUpdate(
      { account_id: accountId },
      { $set: { name, email, country, city, image: imageUrl } },
      { new: true }
    );
    if (name) {
      let updateAccount = await user_account_model.findOneAndUpdate(
        { _id: accountId, role: "seller" },
        { $set: { name: name } },
        { new: true }
      );
    }
    if (email) {
      let updateAccount = await user_account_model.findOneAndUpdate(
        { _id: accountId, role: "seller" },
        { $set: { email: email } },
        { new: true }
      );
    }
    if (updateProfile) {
      res.status(200).json(updateProfile);
    }
  }

  let updateProfile = await seller_profile_model.findOneAndUpdate(
    { account_id: accountId },
    { $set: { name, email, country, city } },
    { new: true }
  );
  if (name) {
    let updateAccount = await user_account_model.findOneAndUpdate(
      { _id: accountId, role: "seller" },
      { $set: { name: name } },
      { new: true }
    );
  }
  if (email) {
    let updateAccount = await user_account_model.findOneAndUpdate(
      { _id: accountId, role: "seller" },
      { $set: { email: email } },
      { new: true }
    );
  }
  if (updateProfile) {
    res.status(200).json(updateProfile);
  }
});

const getAllProfile = asyncErrorHandler(async (req, res) => {
  let findAll = await seller_profile_model.find({});
  if (findAll.length > 0) {
    res.status(200).json(findAll);
  }
  throw new ErrorHandler(api_messages.no_data_found, statusCode.NotFound);
});

const getSingle = asyncErrorHandler(async (req, res) => {
  let findSingleProfile = await seller_profile_model
    .findOne({ account_id: req.params.id })
    .populate("account_id");
  if (findSingleProfile) {
    res.status(200).json(findSingleProfile);
  }
  throw new ErrorHandler(api_messages.no_data_found, statusCode.NotFound);
});

const getDashboardStatistics = asyncErrorHandler(async (req, res) => {
  const sellerId = req.params.sellerId;

  const totalProducts = await productModel.countDocuments({
    seller_id: sellerId,
  });

  const totalOrders = await order_model.countDocuments({
    seller_id: sellerId,
  });

  const totalPendingOrders = await order_model.countDocuments({
    seller_id: sellerId,
    status: "Pending",
  });

  const totalOrdersArray = await order_model.find({
    seller_id: sellerId,
  });

  const totalEarnings = totalOrdersArray.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  res.status(200).json({
    dashboardStatistics: {
      totalProducts,
      totalOrders,
      totalPendingOrders,
      totalEarnings,
    },
  });
});

module.exports = {
  updateProfile,
  getAllProfile,
  getSingle,
  getDashboardStatistics,
};

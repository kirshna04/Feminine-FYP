const { uploadSingleFile } = require("../../config/firebase.config");
const {asyncErrorHandler,ErrorHandler} = require("../../middleware/Error/Utils");
const { customer_profile_model, user_account_model } = require("../../model");
const { api_messages, statusCode } = require("../../common/api_response");

const updateProfile = asyncErrorHandler(async (req, res) => {
  let { name, email, country, city, lastPeriodDate } = req.body;
  let { accountId } = req.params;
  let image = req.file;
  if (image) {
    let imageUrl = await uploadSingleFile(image);
    let updateProfile = await customer_profile_model.findOneAndUpdate(
      { account_id: accountId },
      { $set: { name, email, country, city, lastPeriodDate, image: imageUrl } },
      { new: true }
    );
    if (name) {
      let updateAccount = await user_account_model.findOneAndUpdate(
        { _id: accountId, role: "buyer" },
        { $set: { name: name } },
        { new: true }
      );
    }
    if (email) {
      let updateAccount = await user_account_model.findOneAndUpdate(
        { _id: accountId, role: "buyer" },
        { $set: { email: email } },
        { new: true }
      );
    }
    if (updateProfile) {
      res.status(200).json(updateProfile);
    }
  } else {
    let updateProfile = await customer_profile_model.findOneAndUpdate(
      { account_id: accountId },
      { $set: { name, email, country, city, lastPeriodDate } },
      { new: true }
    );
    if (name) {
      let updateAccount = await user_account_model.findOneAndUpdate(
        { _id: accountId, role: "buyer" },
        { $set: { name: name } },
        { new: true }
      );
    }
    if (email) {
      let updateAccount = await user_account_model.findOneAndUpdate(
        { _id: accountId, role: "buyer" },
        { $set: { email: email } },
        { new: true }
      );
    }
    if (updateProfile) {
      res.status(200).json(updateProfile);
    }
  }
});

const getAllProfile = asyncErrorHandler(async (req, res) => {
  let findAll = await customer_profile_model.find({});
  if (findAll.length > 0) {
    res.status(200).json(findAll);
  }
  throw new ErrorHandler(api_messages.no_data_found, statusCode.NotFound);
});

const getSingle = asyncErrorHandler(async (req, res) => {
  let findSingleProfile = await customer_profile_model.findOne({account_id: req.params.id});
  if (findSingleProfile) {
    const lastPeriodDate = new Date(findSingleProfile.lastPeriodDate);
    const cycleLength = 28;
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
    const currentTime = new Date();
    const timeDifference = nextPeriodDate - currentTime;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const remainingTime = {days,hours,minutes,};
    const responsePayload = { profile: findSingleProfile, remainingTime };
    res.status(200).json(responsePayload)
  }
  throw new ErrorHandler(api_messages.no_data_found, statusCode.NotFound);
});

module.exports = { updateProfile, getAllProfile, getSingle };

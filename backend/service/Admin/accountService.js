const {asyncErrorHandler,ErrorHandler,} = require("../../middleware/Error/Utils");
const {admin_account_model} = require("../../model");
const { api_messages, statusCode } = require("../../common/api_response");
const bcrypt = require("bcryptjs");
const { generate_token } = require("../../middleware/authentication/jwt");
// const { generate_random_number } = require("../../common/random_number");
// const { send_email } = require("../../config/nodemailer.config");

// REGISTER 
const register_admin = asyncErrorHandler(async (req, res) => {
  let {name, email, password } = req.body;
  let find_email = await admin_account_model.find({});
  if (find_email.length>0) {
    throw new ErrorHandler(api_messages?.email_exits, statusCode?.conflict);
  }
  let hash_password = await bcrypt.hash(password, 10);
  let create_admin = await admin_account_model.create({name,email,password: hash_password});
  if (create_admin) {
    let { password, ...other } = create_admin._doc;
    // send_email(email,"Feminine Care Verify Your Account","OTP",`Your OTP is ${otp}.This otp will expires in 10 minutes`);
    res.status(statusCode?.success).json(other);
  }
});

// VERIFY ACCOUNT
// const verify_account = asyncErrorHandler(async (req, res) => {
//   let { id } = req.params;
//   let { otp } = req.body;
//   let find_user = await user_account_model.findById(id);
//   let is_valid_otp = otp == find_user?.otp;
//   if (!is_valid_otp) {
//     throw new ErrorHandler(api_messages?.wrong_otp, statusCode?.forbidden);
//   }
//   let is_otp_expired = find_user.otp_valid_till > Date.now();
//   if (is_otp_expired) { let otp_verified_sucesfull = await user_account_model.findByIdAndUpdate(id,{ $set: { account_verified: true, otp: null, otp_valid_till: null } },{ new: true });
//     if (otp_verified_sucesfull) {
//       let { password, ...other } = find_user._doc;
//       let token = await generate_token(other);
//       res.status(statusCode?.success).json({ token: token, role: find_user?.role });
//     }
//   } 
//   else {
//     let delete_otp = await user_account_model.findByIdAndUpdate(id,{ $set: { otp: null, otp_valid_till: null } });
//     throw new ErrorHandler(api_messages?.otp_expire, statusCode?.gone);
//   }
// });

// const resend_otp = asyncErrorHandler(async (req, res) => {
//   let { id } = req.params;
//   let otp = generate_random_number();
//   let userAccount = await user_account_model.findById(id)
//   let valid_till = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
//   let update_user_account = await user_account_model.findByIdAndUpdate(id,{ $set: { otp: otp, otp_valid_till: valid_till } },{ new: true });
//   if (update_user_account) {
//     send_email(userAccount.email,"Feminine Care Verify Your Account","OTP",`Your OTP is ${otp}.This otp will expires in 10 minutes`);
//     res.status(statusCode?.success).json({ msg: api_messages?.email_sent });
//   }
// });

// LOGIN SELLER AND BUYER
const login_admin = asyncErrorHandler(async (req, res) => {
  let { email, password } = req.body;
  let find_user = await admin_account_model.findOne({ email: email });
  if (!find_user) {
    throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
  }
  else{
    let compare_password = await bcrypt.compare(password, find_user?.password);
    if (compare_password) {
      let { password, ...other } = find_user._doc;
    //   let token = await generate_token(other);
      res.status(statusCode?.success).json(other);
    } 
    else {
      throw new ErrorHandler(api_messages?.invalid_credentails,statusCode.not_authorized);
    }
  }
});

// GET ALL ACCOUNTS INFO
// const get_all_user = asyncErrorHandler(async (req, res) => {
//   let all_user = await user_account_model.find({});
//   if (all_user.length > 0) {
//     res.status(statusCode?.success).json({ all_user });
//   } else {
//     throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
//   }
// });

// GET ALL BUYER
// const get_all_buyer = asyncErrorHandler(async (req, res) => {
//   let all_user = await user_account_model.find({ role: "buyer" });
//   if (all_user.length > 0) {
//     res.status(statusCode?.success).json({ all_user });
//   } else {
//     throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
//   }
// });

// GET ALL SELLER
// const get_all_seller = asyncErrorHandler(async (req, res) => {
//   let all_user = await user_account_model.find({ role: "seller" });
//   if (all_user.length > 0) {
//     res.status(statusCode?.success).json({ all_user });
//   } else {
//     throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
//   }
// });

const getAdmin = asyncErrorHandler(async (req, res) => {
  let { id } = req.params;
  let admin = await admin_account_model.findById(id);
  if (admin) {
    res.status(statusCode?.success).json(admin);
  } else {
    throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
  }
});

// const delete_single_user = asyncErrorHandler(async (req, res) => {
//   let { id } = req.params;
//   let delete_user = await user_account_model.findByIdAndDelete(id);
//   if (delete_user) {
//     res.status(statusCode?.success).json({ msg: api_messages?.deleted });
//   } else {
//     throw new ErrorHandler(api_messages?.no_data_found, statusCode?.NotFound);
//   }
// });

// FORGET PASSWORD

// STEP 1 SEND OTP
// const send_otp = asyncErrorHandler(async (req, res) => {
//   let { email } = req?.body;
//   let findUser = await user_account_model.findOne({ email: email });
//   if (!findUser) {
//     throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
//   }
//   // GENERATE OTP
//   let otp = generate_random_number();
//   let valid_till = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
//   let update_user_account = await user_account_model.findOneAndUpdate(
//     { email: email },
//     { $set: { otp: otp, otp_valid_till: valid_till } },
//     { new: true }
//   );
//   if (update_user_account) {
//     send_email(
//       email,
//       "Feminine Care Forget Passowrd",
//       "OTP",
//       `Your OTP is ${otp}.This otp will expires in 5 minutes`
//     );
//     res.status(statusCode?.success).json({ msg: api_messages?.email_sent });
//   }
// });

// SETP 2 VERIFY OTP
// const verify_otp = asyncErrorHandler(async (req, res) => {
//   let { email, otp } = req?.body;
//   let find_user = await user_account_model.findOne({ email: email });
//   if (!find_user) {
//     throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
//   }
//   let is_valid_otp = otp === find_user?.otp;
//   if (!is_valid_otp) {
//     throw new ErrorHandler(api_messages?.wrong_otp, statusCode?.forbidden);
//   }
//   let is_otp_expired = find_user.otp_valid_till > Date.now();
//   if (is_otp_expired) {
//     let otp_verified_sucesfull = await user_account_model.findOneAndUpdate(
//       { email: email },
//       { $set: { otp_verified: true, otp: null, otp_valid_till: null } }
//     );
//     if (otp_verified_sucesfull) {
//       res
//         .status(statusCode.success)
//         .json({ message: api_messages?.otp_verfied });
//     }
//   } else {
//     let delete_otp = await user_account_model.findOneAndUpdate(
//       { email: email },
//       { $set: { otp: null, otp_valid_till: null } }
//     );
//     throw new ErrorHandler(api_messages?.otp_expire, statusCode?.gone);
//   }
// });

// STEP 3 CHANGE PASSWORD
// const change_password = asyncErrorHandler(async (req, res) => {
//   let { email, password } = req?.body;
//   let find_user = await user_account_model.findOne({ email: email });
//   if (!find_user) {
//     throw new ErrorHandler(api_messages?.email_not_exits, statusCode?.NotFound);
//   }
//   let is_otp_verified = find_user?.otp_verified === true;
//   if (!is_otp_verified) {
//     throw new ErrorHandler(
//       api_messages?.otp_not_verified,
//       statusCode?.not_authorized
//     );
//   } else {
//     let secure_password = await bcrypt.hash(password, 10);
//     let update_user_password = await user_account_model.findOneAndUpdate(
//       { email, email },
//       { $set: { password: secure_password, otp_verified: false } },
//       { new: true }
//     );
//     res
//       .status(statusCode?.success)
//       .json({ message: api_messages?.password_changed });
//   }
// });

// CHANGE PASSWORD

// const changePassword = asyncErrorHandler(async (req, res) => {
//   let { oldpassword, newpassword } = req?.body;
//   let { id } = req?.params;
//   let findaccount = await user_account_model.findById(id);
//   let compare_password = await bcrypt.compare(
//     oldpassword,
//     findaccount?.password
//   );
//   if (compare_password) {
//     let hash_password = await bcrypt.hash(newpassword, 10);
//     let updatePassword = await user_account_model.findByIdAndUpdate(id, {
//       password: hash_password,
//     });
//     res.status(200).json({ msg: "Password Changed" });
//   } else {
//     throw new ErrorHandler(
//       api_messages?.invalid_credentails,
//       statusCode?.not_authorized
//     );
//   }
// });

module.exports = {register_admin,login_admin,getAdmin};

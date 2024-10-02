const { registeration_validation, login_validation, send_otp_validation, verify_otp_validation, change_password_validation } = require('../../middleware/validation/Shared/account_validation')
const { register_user, login_user, send_otp, verify_otp, change_password, get_all_user, get_all_buyer, get_all_seller, get_single_user, delete_single_user, changePassword, verify_account, resend_otp } = require('../../service/Shared/account_service')
const router = require('express').Router()


// POST APIS
router.post("/user-registration",registeration_validation,register_user)
router.post("/user-login",login_validation,login_user)

router.put("/user/verify/account/:id",verify_account)
router.put("/user/resend/otp/:id",resend_otp)

// GET USER APIS
router.get("/all-user-accounts",get_all_user)
router.get("/all-buyer-accounts",get_all_buyer)
router.get("/all-seller-accounts",get_all_seller)
router.get("/single-user-account/:id",get_single_user)

// DELETE USER API 
router.delete("/delete-user-account/:id",delete_single_user)

// CHANGE PASSWORD
router.put('/change/password/:id',changePassword)

// FORGET PASSWORD APIS 
router.post("/forget-password/send-otp",send_otp_validation,send_otp)
router.post("/forget-password/verify-otp",verify_otp_validation,verify_otp)
router.post("/forget-password/change-password",change_password_validation,change_password)



module.exports = router
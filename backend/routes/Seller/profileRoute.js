const router = require("express").Router();
const multipleupload = require("../../config/multer.config");
const {
  getSingle,
  getAllProfile,
  updateProfile,
  getDashboardStatistics,
} = require("../../service/Seller/profileService");

router.put(
  "/seller/profile/update/:accountId",
  multipleupload.single("image"),
  updateProfile
);
router.get("/seller/profile/all", getAllProfile);
router.get("/seller/profile/:id", getSingle);
router.get("/seller/dashboard/:sellerId", getDashboardStatistics);

module.exports = router;

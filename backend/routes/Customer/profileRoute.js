const router = require('express').Router()
const multipleupload = require('../../config/multer.config')
const { updateProfile, getAllProfile, getSingle } = require('../../service/Customer/profile')


router.put("/buyer/profile/update/:accountId",multipleupload.single('image'),updateProfile)
router.get("/buyer/profile/all",getAllProfile)
router.get("/buyer/profile/:id",getSingle)












module.exports = router

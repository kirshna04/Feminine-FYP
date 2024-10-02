const multipleupload = require("../../config/multer.config")
const { createVideo, getVideo, deleteVideo } = require("../../service/Admin/videoService")

const router = require('express').Router()

router.post("/video/create",multipleupload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'video', maxCount: 1 }]),createVideo)
router.get("/video/all/",getVideo)
router.delete("/video/delete/:id",deleteVideo)

// router.get("/blog/single/:id",getSingleBlog)

module.exports = router

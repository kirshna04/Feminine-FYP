const router = require('express').Router()
const multipleupload = require('../../config/multer.config')
const { createBlog, updateBlog, getBlog, getSingleBlog, deleteBlog } = require('../../service/Admin/blogService')

router.post("/blog/create",multipleupload.single('image'),createBlog)
router.put("/blog/update/:id",multipleupload.single('image'),updateBlog)
router.get("/blog/all/",getBlog)
router.get("/blog/single/:id",getSingleBlog)
router.delete("/blog/delete/:id",deleteBlog)





module.exports= router
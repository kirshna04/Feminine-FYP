const { register_admin, login_admin, getAdmin } = require('../../service/Admin/accountService')

const router = require('express').Router()


// POST APIS
router.post("/admin-registration",register_admin)
router.post("/admin-login",login_admin)
router.get("/admin/get/:id",getAdmin)



module.exports = router
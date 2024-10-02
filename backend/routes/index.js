const allRoutes = require('express').Router();
const { api_version } = require('../common/api_response');
const user_account_route = require('./Shared/account_route')
const admin_account_route = require('./Admin/accountRoute')
const product_route = require('./Seller/product_route')
const blog_route = require('./Admin/blogRoute')
const buyer_profile_route = require('./Customer/profileRoute')
const seller_profile_route = require('./Seller/profileRoute')
const video_route = require('./Admin/videoRoute')
const order_route = require('./Customer/orderRoute')
allRoutes.use(`/${api_version}`,user_account_route)
allRoutes.use(`/${api_version}`,product_route)
allRoutes.use(`/${api_version}`,blog_route)
allRoutes.use(`/${api_version}`,buyer_profile_route)
allRoutes.use(`/${api_version}`,seller_profile_route)
allRoutes.use(`/${api_version}`,order_route)

allRoutes.use(`/${api_version}`,admin_account_route)
allRoutes.use(`/${api_version}`,video_route)


module.exports = {allRoutes}

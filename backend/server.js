const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./config/DbConfig");
const { errorMiddleware, ErrorHandler } = require("./middleware/Error/Utils");
const { invalidApi, statusCode } = require("./common/api_response");
const { allRoutes } = require("./routes");
const {
  user_account_model,
  customer_profile_model,
  seller_profile_model,
  productModel,
  order_model,
} = require("./model");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// DATABASE CONNECTION
dbConnection();

// ROUTES
app.use("/api", allRoutes);

// CUSTOM ERROR HANDLER
app.use(errorMiddleware);
app.use((req, res, next) => {
  next(new ErrorHandler(invalidApi, statusCode?.NotFound));
});

// DELET ACCOUNT
const deleteAll= async()=>{
  // await user_account_model.deleteMany({})
  // await customer_profile_model.deleteMany({})
  // await seller_profile_model.deleteMany({})
  // await seller_profile_model.deleteMany({})
  // await order_model.deleteMany({})
}
deleteAll()

// PORT LISTING
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

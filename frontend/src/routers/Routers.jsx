import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import VerifyAccountScreen from "../screens/AccountScreen/VerifyAccountScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ForgetPasswordScreen from "../screens/AccountScreen/ForgetPasswordScreen";
import ProductScreen from "../screens/SingleProductScreen/ProductScreen";
import NotFoundScreen from "../screens/404/NotFoundScreen";
import Product from "../screens/SearchScreen/Product";
import CartScreen from "../screens/AddToCartScreen/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen/Screen";
import ProfileScreen from "../screens/BuyerProfileScreen/ProfileScreen";
import FavouriteItemScreen from "../screens/FavouriteItemScreen/FavouriteItemScreen";
import BlogScreen from "../screens/BlogScreen/BlogScreen";
import SingleBlogScreen from "../screens/BlogScreen/SingleBlogScreen";
import VideoScreen from "../screens/VideoScreen/VideoScreen";
import HomeDashbaordScreen from "../screens/Seller/HomeDasboardScreen/HomeDashbaordScreen";
import ProductDashboardScreen from "../screens/Seller/ProductDashboardScreen/ProductDashboardScreen";
import SingleProductScreen from "../screens/Seller/ProductDashboardScreen/SingleProductScreen";
import SellerProfile from "../screens/Seller/ProfileScreen/ProfileScreen";
import LoginScreen from "../screens/Admin/LoginScreen";
import RegisterScreen from "../screens/Admin/RegisterScreen";
import ForgetScreen from "../screens/Admin/ForgetScreen";
import HomeScreenAdmin from "../screens/Admin/HomeScreen";
import BlogScreenAdmin from "../screens/Admin/BlogScreen";
import VideosScreen from "../screens/Admin/VideosScreen";
import HistoryScreen from "../screens/OrderHistory/HistoryScreen";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SingleOrderSummary from "../layout/Customer/History/SingleOrderSummary";
import OrdersDashboardScreen from "../screens/Seller/OrderDashboardScreen/OrderDashboardScreen";

// const stripePromise = loadStripe("your_publishable_key");

// Use Stripe's test publishable key
const stripePromise = loadStripe(
  "pk_test_51PP5AJP7OLVpVzGF2k3ASmxPtHMIJeGJa1tirifeU4dpVU4QHHcIQFz3ZVcmr5vEm4Eeo1nprPdhvAH9WT9gwKIh00WzaN5aA3"
);

  // "pk_test_51NhMW4Im76tKZYsvO4PB8z1OkBX9okkwhJtIfvBNxRLgLcfB2jeYC3UsCbht7BGB91jt6YKkCpkOLbHXv9UfIWcI00y7RX39Se"



const Routers = () => {
  return (
    <Routes>
      {/* BUYER  */}
      <Route path="/account" element={<AccountScreen />} />
      <Route path="/verify/account" element={<VerifyAccountScreen />} />
      <Route path="/forget/password" element={<ForgetPasswordScreen />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/product/" element={<Product />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/favourite" element={<FavouriteItemScreen />} />
      <Route path="/blog" element={<BlogScreen />} />
      <Route path="/blog/:id" element={<SingleBlogScreen />} />
      <Route path="/video" element={<VideoScreen />} />
      <Route path="/buyer/profile" element={<ProfileScreen />} />
      <Route
        path="/checkout"
        element={
          <Elements stripe={stripePromise}>
            <CheckoutScreen />
          </Elements>
        }
      />
      <Route path="/history" element={<HistoryScreen />} />
      <Route path="/order-summary" element={<SingleOrderSummary />} />

      {/* SELLER  */}
      <Route path="/seller/dashboard" element={<HomeDashbaordScreen />} />
      <Route
        path="/seller/dashboard/products"
        element={<ProductDashboardScreen />}
      />
      <Route
        path="/seller/dashboard/orders"
        element={<OrdersDashboardScreen />}
      />
      <Route
        path="/seller/dashboard/product/view/:id"
        element={<SingleProductScreen />}
      />
      <Route path="/seller/dashboard/profile" element={<SellerProfile />} />

      {/* ADMIN */}
      <Route path="/admin/login" element={<LoginScreen />} />
      <Route path="/admin/register" element={<RegisterScreen />} />
      <Route path="/admin/forget" element={<ForgetScreen />} />
      <Route path="/admin/home" element={<HomeScreenAdmin />} />
      <Route path="/admin/blogs" element={<BlogScreenAdmin />} />
      <Route path="/admin/videos" element={<VideosScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default Routers;

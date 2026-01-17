import React, { useContext } from "react"; // Import useContext
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
// Remove connect, selectCurrentUser, checkUserSession

import HomePage from "./pages/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.componnent.jsx";
import Header from "./components/header/header.component.jsx";
import SigninAndSignUp from "./pages/sign-in and sign-up/sign-in and sign-up.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";

import { UserContext } from "./context/user.context.jsx"; // Import Context

const App = () => {
  const { currentUser } = useContext(UserContext); // Get currentUser from Context

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/*" element={<ShopPage />} />
        <Route path="/contact" />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/signin"
          // Use currentUser from Context
          element={currentUser ? <Navigate to="/" /> : <SigninAndSignUp />}
        />
      </Routes>
    </div>
  );
};

export default App;

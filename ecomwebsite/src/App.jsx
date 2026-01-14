import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./pages/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.componnent.jsx"; //
import Header from "./components/header/header.component.jsx";
import SigninAndSignUp from "./pages/sign-in and sign-up/sign-in and sign-up.jsx"; //
import CheckoutPage from "./pages/checkout/checkout.component.jsx";
// import { connect } from "react-redux";
import { selectCurrentUser } from "./Redux/user/user.selector.js";
import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./Redux/user/user.actions.js";
// import { selectCollectionsForPreview } from "./Redux/Shop/shop.selector.js";
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;

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
            element={currentUser ? <Navigate to="/" /> : <SigninAndSignUp />}
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps,mapDispatchToProps)(App);

import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.componnent.jsx"; // 
import Header from "./components/header/header.component.jsx";
import SigninAndSignUp from "./pages/sign-in and sign-up/sign-in and sign-up.jsx"; // 
import CheckoutPage from "./pages/checkout/checkout.component.jsx";
import { connect } from "react-redux";
import { auth, createUserProfileDocument,addCollectionsAndItems } from "./firebase/firebase.utils.js";
import { onSnapshot } from "firebase/firestore";
import { setCurrentUser } from "./Redux/user/user.actions.js";
import { selectCurrentUser } from "./Redux/user/user.selector.js";
import { createStructuredSelector } from "reselect";
// import { selectCollectionsForPreview } from "./Redux/Shop/shop.selector.js";
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
        // addCollectionsAndItems("collections",collectionsArray.map(({title,items})=>({title,items})));
      }
    });
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
          <Route path="/contact"  />
          <Route path="/checkout" element ={<CheckoutPage/>}  />
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
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

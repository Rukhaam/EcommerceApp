import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase/firebase.utils";
import Logo from "../../assests/084 crown.svg?react";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./header.styles.scss";
import { signOutStart } from "../../Redux/user/user.actions";
import { selectCartHidden } from "../../Redux/cart/cart.selectors";
import { selectCurrentUser } from "../../Redux/user/user.selector";

const Header = ({ currentUser, hidden,signOutStart }) => {

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>

      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>

        {currentUser ? (
          <div className="option" onClick={signOutStart}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}

        <CartIcon />
      </div>

      {hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
const mapDispatchToProps = dispatch=>({
      signOutStart : ()=> dispatch(signOutStart())
})
export default connect(mapStateToProps,mapDispatchToProps)(Header);

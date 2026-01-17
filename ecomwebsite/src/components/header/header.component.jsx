import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Use hooks instead of connect

import Logo from "../../assests/084 crown.svg?react";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./header.styles.scss";

import { selectCartHidden } from "../../Redux/cart/cart.selectors";
import { UserContext } from "../../context/user.context";

const Header = () => {
  const { currentUser, signOutUser } = useContext(UserContext); // Context
  const hidden = useSelector(selectCartHidden); // Redux Hook

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>

      <div className="options">
        <Link className="option" to="/shop">SHOP</Link>
        <Link className="option" to="/contact">CONTACT</Link>

        {currentUser ? (
          <div className="option" onClick={signOutUser}> {/* Use Context Method */}
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">SIGN IN</Link>
        )}

        <CartIcon />
      </div>

      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
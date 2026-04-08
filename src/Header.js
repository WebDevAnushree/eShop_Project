import React from "react";
import "./Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StorefrontIcon from "@material-ui/icons/Storefront";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";



function Header({ setSearchTerm }) {

  const [{ basket, user }, dispatch] = useStateValue(); // ✅ dispatch added
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (user) {
      await signOut(auth);

      dispatch({
        type: "SET_USER",
        user: null,
      });

      dispatch({
        type: "EMPTY_BASKET",
      });
      localStorage.removeItem('user')

      navigate("/login");
    }
  };

  return (
    <div className="header">

      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="header__logo">
          <StorefrontIcon className="header__logoImage" fontSize="large" />
          <h2 className="header__logoTitle">eShop</h2>
        </div>
      </Link>

      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">

        <div onClick={handleAuth} style={{ cursor: "pointer" }}>
          <Link to={!user && "/login"} style={{ textDecoration: "none" }}>
            <div className="nav__item">
          
              <span className="nav__itemLineOne">
                Hello {user ? user.email : "Guest"}
              </span>
              <span className="nav__itemLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
        </div>

        <div className="nav__item">
          <span className="nav__itemLineOne">Your</span>
          <span className="nav__itemLineTwo">Shop</span>
        </div>

        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="nav__itemBasket">
            <ShoppingBasketIcon />
            <span className="nav__itemLineTwo nav__basketCount">
              {basket?.length || 0}
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Header;

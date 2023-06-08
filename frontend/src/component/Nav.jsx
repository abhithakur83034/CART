import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  console.log("nav",props)
  const { cartItems } = props;

  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Show</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add">Add Product</Link>
        </li>

        <span className="nav-item" >
          <Link className="nav-link" to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </span>
      </ul>
    </>
  );
}

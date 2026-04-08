

import React from "react";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (basket.length === 0) {
      alert("Your basket is empty");
      return;
    }

      
    alert("Checkout started successfully!");

    
    dispatch({
      type: "EMPTY_BASKET",
    });

    
    navigate("/success");
  };


  const totalItems = basket.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  return (
    <div className="priceBox">
      
      <h3 className="priceTitle">
        Price Details ({totalItems} Items)
      </h3>

      <div className="row">
        <span>Product Price</span>
        <span>₹{getBasketTotal(basket).toFixed(2)}</span>
      </div>

      <div className="row green">
        <span>Total Discounts</span>
        <span>- ₹0</span>
      </div>

      <hr />

      <div className="row total">
        <span>Order Total</span>
        <span>₹{getBasketTotal(basket).toFixed(2)}</span>
      </div>

      <label className="gift">
        <input type="checkbox" />
        This order contains a gift
      </label>

      <button className="continueBtn" onClick={handleContinue}>
        Continue
      </button>

    </div>
  );
}

export default Subtotal;
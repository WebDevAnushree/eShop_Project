import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({
    id,
    title,
    image,
    price,
    rating,
    qty,
    description,
}) {

  const [, dispatch] = useStateValue();

  const increaseQty = () => {
    dispatch({ type: "INCREASE_QTY", id });
  };

  const decreaseQty = () => {
    dispatch({ type: "DECREASE_QTY", id });
  };

  const removeFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", id });
  };

  return (
    <div className="checkoutProductCard">

  <img
    src={image}
    alt={title}
    className="checkoutProductImg"
  />

  <div className="checkoutProductInfo">

    <h4 className="checkoutProductTitle">{title}</h4>

    <div className="checkoutRating">
      {"⭐".repeat(Math.round(rating))}
    </div>

    <p className="checkoutPrice">₹{price}</p>

    <div className="checkoutActions">

      <div className="qtyBox">
        <button onClick={decreaseQty}>−</button>
        <span>{qty}</span>
        <button onClick={increaseQty}>+</button>
      </div>

      <button className="removeBtn" onClick={removeFromBasket}>
        Remove
      </button>

    </div>

  </div>
</div>
  );
}

export default CheckoutProduct;
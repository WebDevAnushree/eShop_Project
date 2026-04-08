
import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({
  id,
  title,
  image,
  price,
  rating,
  description,
  brand,
}) {

  const [, dispatch] = useStateValue();

  const addToBasket = () => {

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
        description,
        brand
      },
    });
  };

  return (
    <div className="product-card">

      <img src={image} alt={title} />

      <div className="product-body">

        <div className="product-title">{title}</div>
        <div className="product-brand">{brand}</div>

        <div className="product-desc">
          {description}
        </div>

        <div className="product-footer">
          <span className="price">₹{price}</span>
          <span className="rating">⭐ {rating}</span>
        </div>

        <button onClick={addToBasket}>
          Add to cart
        </button>

      </div>
    </div>
  );
}

export default Product;

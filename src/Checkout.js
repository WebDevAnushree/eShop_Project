import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkoutPage">
      <div className="checkoutContainer">

        {/* LEFT */}
        <div className="checkoutLeft">
          <h2 className="checkoutHeading">Product Details</h2>

          {basket.length === 0 ? (
            <p>Your basket is empty.</p>
          ) : (
            basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                price={item.price}
                rating={item.rating}
                qty={item.qty}
              />
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="checkoutRight">
          <Subtotal />
        </div>

      </div>
    </div>
  );
}

export default Checkout;

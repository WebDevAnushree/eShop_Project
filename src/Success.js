import React from "react";
import "./Success.css";
import { Link } from "react-router-dom";

function Success(){
return(
<div className="success">
<h1>🎉 Order Placed Successfully</h1>
<p>Your order has been confirmed</p>

<Link to="/">
<button>Continue Shopping</button>
</Link>

</div>
)
}

export default Success;
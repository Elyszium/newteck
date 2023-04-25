// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   cartActions
// } from "../../redux/slice/cartSlice";
// import { selectEmail } from "../../redux/slice/authSlice";
// import {
//   selectBillingAddress,
//   selectShippingAddress,
// } from "../../redux/slice/checkoutSlice";
// import { toast } from "react-toastify";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// const CheckoutDetails = () => {
//  const [message, setMessage] = useState("Initializing checkout...");
//   const [clientSecret, setClientSecret] = useState("");

  
//   const totalAmount = useSelector(selectCartTotalAmount);
//   const customerEmail = useSelector(selectEmail);

    
//   return (
//     <div>CheckoutDetails</div>
//   )
// }

// export default CheckoutDetails
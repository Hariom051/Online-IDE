import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";
import image from "./back.png";
import image1 from "./s-5-img-32.png";

export const Payment = () => {
  const navigate = useNavigate();
  useEffect(() => {    
    const form = document.createElement("form");
    form.setAttribute("id", "pay");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute("data-payment_button_id", process.env.REACT_APP_PAYMENT_KEY);
    form.appendChild(script);
    document.body.appendChild(form);
  }, []);
  return (
    <>
      <h5  className="text-center ">
        <img
          onClick={() => {
            const ele = document.getElementById("pay");
            ele.remove();
            navigate("/");
          }}
          src={image}
          alt="Back"
        />{" "}
        Welcome to our Support page !!!
      </h5>
    </>
  );
};

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useLottie } from "lottie-react";
import successAnimation from "./Success_Animation.json";
import "./Success.scss";

const Success = (req,res,next) => {
  const options = {
    animationData: successAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success">
      <div className="animation">{View}</div>
      <div className="text">
        <h1>
          Your payment is successful.You are being redirected to the Orders
          Page.
        </h1>
      </div>
    </div>
  );
};

export default Success

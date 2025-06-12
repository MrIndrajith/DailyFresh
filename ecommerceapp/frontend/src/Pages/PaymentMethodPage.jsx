import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethodPage = () => {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    if (method === "upi") {
      navigate("/upi-payment");
      return;
    }
    if (method === "card") {
      navigate("/card-payment");
      return;
    }
    if (method === "cod") {
      alert("Order placed with Cash on Delivery!");
      navigate("/");
      return;
    }
  };

  const handleCheckout = () => {
    navigate("/payment-method");
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Select Payment Method</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>
            <input
              type="radio"
              value="card"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Credit/Debit Card
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="upi"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />
            UPI
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="cod"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>
        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: "10px 30px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodPage;
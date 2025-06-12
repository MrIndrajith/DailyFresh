import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const UpiPaymentPage = () => {
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { cart } = useShop();
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!upiId) {
      setMessage("Please enter a valid UPI ID.");
      return;
    }
    setMessage("Order placed via UPI!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div style={{ padding: 32, maxWidth: 400, margin: "40px auto", background: "#23272f", borderRadius: 8, color: "#fff" }}>
      <h2>UPI Payment</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Enter UPI ID:</label>
          <input
            type="text"
            value={upiId}
            onChange={e => setUpiId(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "none", marginTop: 8 }}
            placeholder="example@upi"
            required
          />
        </div>
        <div style={{ marginBottom: 16, fontWeight: 600 }}>
          Cart Total: ₹{total}
        </div>
        <button
          type="submit"
          style={{ padding: "10px 30px", background: "#4caf50", color: "#fff", border: "none", borderRadius: 4, fontSize: 18, cursor: "pointer" }}
        >
          Send Payment Request
        </button>
      </form>
      {message && <div style={{ marginTop: 20, color: "#4caf50", fontWeight: 600 }}>{message}</div>}
    </div>
  );
};

export default UpiPaymentPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const CardPaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { cart } = useShop();
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) {
      setMessage("Please fill all card details.");
      return;
    }
    setMessage("Order placed via Card!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div style={{ padding: 32, maxWidth: 400, margin: "40px auto", background: "#23272f", borderRadius: 8, color: "#fff" }}>
      <h2>Card Payment</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "none", marginTop: 8 }}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "none", marginTop: 8 }}
            placeholder="MM/YY"
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>CVV:</label>
          <input
            type="password"
            value={cvv}
            onChange={e => setCvv(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "none", marginTop: 8 }}
            placeholder="123"
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
          Pay Now
        </button>
      </form>
      {message && <div style={{ marginTop: 20, color: "#4caf50", fontWeight: 600 }}>{message}</div>}
    </div>
  );
};

export default CardPaymentPage;

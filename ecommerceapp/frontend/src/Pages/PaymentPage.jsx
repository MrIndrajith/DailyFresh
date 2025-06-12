import React from "react";
import { useShop } from "../../context/ShopContext";

const PaymentPage = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useShop();

  return (
    <div style={{ padding: 32 }}>
      <h2>Payment Page</h2>
      {/* <p></p> */}
      <div
        style={{
          marginTop: 30,
          padding: 20,
          border: "1px solid #4caf50",
          borderRadius: 8,
          background: "#e8f5e9",
          color: "#388e3c",
          textAlign: "center",
          fontSize: 18,
        }}
      >
        Thank you for your purchase!
      </div>
      <img
        src={product.img}
        alt={product.name}
        style={{
          width: 120,
          height: 120,
          objectFit: "cover",
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <br />
      <button
      // ...wishlist button props...
      >
      </button>
    </div>
  );
};

export default PaymentPage;
import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

 
  const addToCart = (product) => {
    setCart((prev) =>
      prev.find((p) => p.name === product.name) ? prev : [...prev, product]
    );
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((p) => p.name !== name));
  };

  const addToWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p.name === product.name) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (name) => {
    setWishlist((prev) => prev.filter((p) => p.name !== name));
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
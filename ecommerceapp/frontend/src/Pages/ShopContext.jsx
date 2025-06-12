import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  // ...state and functions...
  return (
    <ShopContext.Provider value={{ /* ...values... */ }}>
      {children}
    </ShopContext.Provider>
  );
};
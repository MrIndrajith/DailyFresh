import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = ({ mode, onToggleMode, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        backgroundColor: "#3385fa", // <-- set to your blue
        padding: "10px",
        color: "#fff",
        display: "flex",
        alignItems: "center"
      }}
      className="navbar"
    >
      <div style={{ fontWeight: "bold", fontSize: 24, marginRight: 24 }} className="logo">ShopEase</div>
      <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
        <IconButton onClick={onToggleMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
      <button onClick={() => navigate("/")} style={buttonStyle}>Home</button>
      {!isLoggedIn && <>
        <button onClick={() => navigate("/login")} style={buttonStyle}>Login</button>
        <button onClick={() => navigate("/register")} style={buttonStyle}>Register</button>
      </>}
      {isLoggedIn && <>
        <button onClick={() => navigate("/cart")} style={buttonStyle}>Cart</button>
        <button onClick={() => navigate("/wishlist")} style={buttonStyle}>Wishlist</button>
        <button onClick={() => navigate("/user")} style={buttonStyle}>User</button>
        <button onClick={onLogout} style={buttonStyle}>Logout</button>
      </>}
    </nav>
  );
};

const buttonStyle = {
  marginLeft: "10px",
  padding: "8px 16px",
  backgroundColor: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default Navbar;
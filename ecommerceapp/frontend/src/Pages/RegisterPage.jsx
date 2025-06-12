import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";

const getTextColor = (mode) => (mode === "dark" ? "#fff" : "#1e3c72");

const RegisterPage = ({ mode = "dark" }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    dob: "",
    email: "",
    number: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #1e3c72 0%, #23272f 100%)"
            : "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          minWidth: 400,
          maxWidth: 420,
          background:
            mode === "dark"
              ? "rgba(34,39,47,0.98)"
              : "rgba(255,255,255,0.98)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#1e3c72",
              width: 64,
              height: 64,
              mb: 1,
            }}
          >
            <PersonIcon sx={{ fontSize: 40, color: "#fff" }} />
          </Avatar>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: getTextColor(mode) }}
          >
            Create Account
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="dob"
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="number"
            label="Phone Number"
            value={form.number}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            Register
          </Button>
        </form>
        {message && (
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: message.includes("successful")
                ? "green"
                : "red",
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RegisterPage;
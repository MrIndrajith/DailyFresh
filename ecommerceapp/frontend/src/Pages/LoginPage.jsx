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
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate, Link } from "react-router-dom";

const getTextColor = (mode) => (mode === "dark" ? "#fff" : "#1e3c72");

const LoginPage = ({ onLogin, mode = "dark" }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(data));
        if (onLogin) onLogin(data.name);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
    setLoading(false);
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
            <LockIcon sx={{ fontSize: 40, color: "#fff" }} />
          </Avatar>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: getTextColor(mode) }}
          >
            Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
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
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
        <Typography
          sx={{
            fontSize: "sm",
            alignSelf: "center",
            mt: 2,
            textAlign: "center",
            color: getTextColor(mode),
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#1e3c72",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Sign up
          </Link>
        </Typography>
        <Typography
          sx={{
            fontSize: "sm",
            alignSelf: "center",
            mt: 2,
            textAlign: "center",
            color: getTextColor(mode),
          }}
        >
          Admin?{" "}
          <Link
            to="/admin-login"
            style={{
              color: "#1e3c72",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Log in here
          </Link>
        </Typography>
        {message && (
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color:
                message === "Login successful!" ? "green" : "red",
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

export default LoginPage;
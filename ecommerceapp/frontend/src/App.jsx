import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import CartPage from './Pages/Cart Page';
import ProductListPage from './pages/ProductListPage';
import PaymentPage from './pages/PaymentPage';
import UserDetailsPage from './pages/UserDetailsPage';
import Navbar from '../Component/Navbar';
import LoginPage from "./pages/LoginPage";
import WishlistPage from './pages/WishlistPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import UpiPaymentPage from './Pages/UpiPaymentPage';
import CardPaymentPage from './Pages/CardPaymentPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminHomePage from './Pages/AdminHomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('user'));
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');

  const theme = createTheme({
    palette: { mode },
  });

  const handleToggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('user');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        mode={mode}
        onToggleMode={handleToggleMode}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <Routes>
        {/* Public Home route for guest mode */}
        <Route path="/" element={<HomePage mode={mode} searchTerm={searchTerm} isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<LoginPage onLogin={(name) => { setIsLoggedIn(true); setUsername(name); }} />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Payment flows */}
        <Route path="/upi-payment" element={<UpiPaymentPage />} />
        <Route path="/card-payment" element={<CardPaymentPage />} />
        {/* Protected routes */}
        <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />} />
        <Route path="/products" element={isLoggedIn ? <ProductListPage /> : <Navigate to="/login" />} />
        <Route path="/payment-method" element={isLoggedIn ? <PaymentMethodPage /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isLoggedIn ? <PaymentPage /> : <Navigate to="/login" />} />
        <Route path="/user" element={isLoggedIn ? <UserDetailsPage /> : <Navigate to="/login" />} />
        <Route path="/wishlist" element={isLoggedIn ? <WishlistPage /> : <Navigate to="/login" />} />
        <Route path="/productlist" element={isLoggedIn ? <ProductListPage /> : <Navigate to="/login" />} />
        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
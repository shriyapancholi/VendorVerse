import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/SupplierDashboard';
import Vendorhomepage from './pages/Vendorhomepage';
import ReviewPage from "./pages/ReviewPage"; 
import AnalyticsPage from './pages/AnalyticsPage';
import BuyingPage from './pages/BuyingPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import './App.css';

function App() {
  // Language state is no longer needed here
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/signup" element={<AuthForm mode="signup" />} />
      
      {/* REMOVED: The /language route is gone */}
      
      {/* Main App Flow */}
      {/* Vendorhomepage no longer needs the language prop, it can default to 'en' */}
      <Route path="/Vendorhomepage" element={<Vendorhomepage />} />
      <Route path="/buy/:productId" element={<BuyingPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/review" element={<ReviewPage />} />
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
}

export default App;

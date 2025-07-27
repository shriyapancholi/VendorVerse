import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/SupplierDashboard';
import LanguagePage from './pages/LanguagePage';
import Vendorhomepage from './pages/Vendorhomepage';
import ReviewPage from "./pages/ReviewPage"; 
import AnalyticsPage from './pages/AnalyticsPage';
import BuyingPage from './pages/BuyingPage';
import CartPage from './pages/CartPage'; // Import the CartPage
import './App.css';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

// This new component will contain all the routing logic.
// This is a clean pattern that ensures useNavigate works correctly.
function AppRoutes() {
  // State to manage the selected language across the application
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  // This function is passed to LanguagePage to update the state and navigate
  const handleLanguageSelect = (langId) => {
    setLanguage(langId);
    // After setting the language, navigate to the vendor homepage
    navigate('/Vendorhomepage');
  };

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/signup" element={<AuthForm mode="signup" />} />
      
      {/* Main App Flow */}
      <Route 
        path="/language" 
        element={<LanguagePage onLanguageSelect={handleLanguageSelect} />} 
      />
      <Route 
        path="/Vendorhomepage" 
        element={<Vendorhomepage language={language} />} 
      />
      <Route path="/buy/:productId" element={<BuyingPage />} />
      <Route path="/cart" element={<CartPage />} /> {/* Added Cart Route */}

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/review" element={<ReviewPage />} />
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
       <Route path="/order-success" element={<OrderSuccessPage />} />
    </Routes>
  );
}


// The main App component now simply renders the AppRoutes.
// Note: Your main.jsx file must wrap <App /> in <BrowserRouter>.
function App() {
  return <AppRoutes />;
}

export default App;

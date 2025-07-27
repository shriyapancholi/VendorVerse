import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthForm from './components/AuthForm';
import Dashboard from './pages/SupplierDashboard';
import LanguagePage from './pages/LanguagePage';
import './App.css';
import Vendorhomepage from './pages/Vendorhomepage';
import ReviewPage from "./pages/ReviewPage"; 
import AnalyticsPage from './pages/AnalyticsPage';
import BuyingPage from './pages/BuyingPage';

function App() {
  // Add state to manage the selected language across the application
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate(); // Initialize the navigate hook

  // This function will be passed to LanguagePage to update the state
  const handleLanguageSelect = (langId) => {
    setLanguage(langId);
    // After setting the language, navigate to the vendor homepage
    navigate('/Vendorhomepage');
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/signup" element={<AuthForm mode="signup" />} />
      
      {/* Modified: LanguagePage now receives the prop that handles state and navigation */}
      <Route 
        path="/language" 
        element={<LanguagePage onLanguageSelect={handleLanguageSelect} />} 
      />
      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/review" element={<ReviewPage />} />
      
      {/* Modified: Vendorhomepage receives the current language as a prop */}
      <Route 
        path="/Vendorhomepage" 
        element={<Vendorhomepage language={language} />} 
      />
      
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />

      {/* Added: New dynamic route for the BuyingPage */}
      <Route path="/buy/:productId" element={<BuyingPage />} />
    </Routes>
  );
}

export default App;

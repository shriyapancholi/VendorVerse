import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/SupplierDashboard';
import LanguagePage from './pages/LanguagePage';
import './App.css';
import Vendorhomepage  from './pages/Vendorhomepage';
import ReviewPage from "./pages/ReviewPage"; 
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/signup" element={<AuthForm mode="signup" />} />
      <Route path="/language" element={<LanguagePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/review" element={<ReviewPage />} />
      <Route path="/Vendorhomepage" element={<Vendorhomepage/>} />
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
}

export default App;

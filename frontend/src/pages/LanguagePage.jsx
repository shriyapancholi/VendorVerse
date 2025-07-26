import React from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';

const LanguagePage = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (langId) => {
    localStorage.setItem('preferredLanguage', langId);
    navigate('/dashboard');
  };

  return <LanguageSelector onSelect={handleLanguageSelect} />;
};

export default LanguagePage;

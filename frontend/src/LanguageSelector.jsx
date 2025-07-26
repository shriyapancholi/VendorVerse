import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './LanguageSelector.css';
import { useNavigate } from 'react-router-dom';

const languages = [
  { id: 'en', name: 'English', symbol: 'A' },
  { id: 'hi', name: 'Hindi', symbol: 'हि' },
  { id: 'kn', name: 'Kannada', symbol: 'ಕ' },
  { id: 'ml', name: 'Malayalam', symbol: 'മ' },
  { id: 'ta', name: 'Tamil', symbol: 'த' },
  { id: 'te', name: 'Telugu', symbol: 'తె' },
  { id: 'mr', name: 'Marathi', symbol: 'म' },
  { id: 'gu', name: 'Gujarati', symbol: 'ગ' },
  { id: 'bn', name: 'Bengali', symbol: 'ব' },
  { id: 'pa', name: 'Punjabi', symbol: 'ਪ' },
  { id: 'or', name: 'Odia', symbol: 'ଓ' },
  { id: 'ur', name: 'Urdu', symbol: 'اُ' },
  { id: 'as', name: 'Assamese', symbol: 'অ' },
  { id: 'sa', name: 'Sanskrit', symbol: 'ळ' },
];

const LanguageSelector = ({ onSelect }) => {
  const [selectedLang, setSelectedLang] = useState(null);
    const navigate = useNavigate();
  const handleSelect = (id) => {
    setSelectedLang(id);

  };

  const handleProceed = () => {
    if (selectedLang && onSelect) {
      onSelect(selectedLang);
      navigate('/Vendorhomepage'); 
    }
  };
;
  return (
    <div className="language-selector">
      <h2>Select Your Language</h2>
      <ul>
        {languages.map((lang) => (
          <li
            key={lang.id}
            className={selectedLang === lang.id ? 'selected' : ''}
            onClick={() => handleSelect(lang.id)}
          >
            <div className="symbol">{lang.symbol}</div>
            <span>{lang.name}</span>
            {selectedLang === lang.id && (
              <FaCheckCircle className="check-icon" />
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleProceed}
        disabled={!selectedLang}
        className={selectedLang ? '' : 'disabled'}
      >
        Proceed
      </button> 
    </div>
  );
};

export default LanguageSelector;
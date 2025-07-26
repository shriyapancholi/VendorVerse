import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ import this

const cities = ["Surat", "Ahmedabad", "Rajkot", "Vadodara", "Gandhinagar"];

export default function SupplierHeader() {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState("Select Location");
    const [showDropdown, setShowDropdown] = useState(false);

      const handleLogout = () => {
    // 🔐 Clear any login/session data
    localStorage.clear(); // or localStorage.removeItem("token") if using a key
    sessionStorage.clear();

    // 🔁 Redirect to login page
    navigate("/login"); // change to your login route
  };

    return (
        <header className="vendor-header">
  <div className="top-bar">
    {/* Left Section */}
    <div className="left-section">
      <h1 className="logo">VendorVerse Supplier</h1>
      <div className="location-selector" onClick={() => setShowDropdown(!showDropdown)}>
        <span>{selectedCity}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        {showDropdown && (
          <ul className="dropdown">
            {cities.map((city) => (
              <li key={city} onClick={() => { setSelectedCity(city); setShowDropdown(false); }}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Center Section */}
    <div className="center-section">
      <div className="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" placeholder="Search inventory..." />
      </div>
    </div>

    {/* Right Section */}
    <div className="right-section">
      <div className="user-action" onClick={handleLogout}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Logout</span>
      </div>
    </div>
  </div>
</header>

    );
}

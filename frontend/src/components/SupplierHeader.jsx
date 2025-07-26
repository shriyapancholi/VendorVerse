import React, { useState } from "react";

const cities = ["Surat", "Ahmedabad", "Rajkot", "Vadodara", "Gandhinagar"];

export default function SupplierHeader() {
    const [selectedCity, setSelectedCity] = useState("Select Location");
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="supplier-header">
            <div className="logo">SwapShop Supplier</div>

            <div className="header-right">
                <div className="location-selector" onClick={() => setShowDropdown(!showDropdown)}>
                    {selectedCity}
                    <span>▼</span>
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

                <div className="search-box">
                    <input type="text" placeholder="Search inventory..." />
                </div>

                <button className="logout-btn">Logout</button>
            </div>
        </header>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  FaCarrot, FaAppleAlt, FaCheese, FaOilCan,
  FaStore, FaDrumstickBite, FaLeaf, FaHotdog
} from 'react-icons/fa';
import '../styles/Vendorhomepage.css';

const categories = [
  { name: 'Vegetables', icon: <FaCarrot color="#4CAF50" size={20} /> },
  { name: 'Fruits', icon: <FaAppleAlt color="#FF5722" size={20} /> },
  { name: 'Dairy', icon: <FaCheese color="#FFC107" size={20} /> },
  { name: 'Oils', icon: <FaOilCan color="#FF9800" size={20} /> },
  { name: 'Groceries', icon: <FaStore color="#3F51B5" size={20} /> },
  { name: 'Meat', icon: <FaDrumstickBite color="#E91E63" size={20} /> },
  { name: 'Ready-to-Use', icon: <FaLeaf color="#009688" size={20} /> },
  { name: 'Processed Foods', icon: <FaHotdog color="#9C27B0" size={20} /> },
];


const Vendorhomepage = () => {
  const [activeCategory, setActiveCategory] = useState('Vegetables'); // ✅ exists in supplier data
  const [inventory, setInventory] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (navRef.current) {
      navRef.current.scrollLeft += scrollOffset;
    }
  };

  // Dropdown for city
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select Location");
  const locations = ["Surat", "Ahmedabad", "Rajkot", "Vadodara", "Gandhinagar"];
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const selectCity = (city) => {
    setSelectedCity(city);
    setShowDropdown(false);
  };

  // Load inventory from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sharedInventory");
    if (saved) {
      const parsed = JSON.parse(saved);
      setInventory(parsed);
      setFilteredItems(parsed.filter(item => item.category === activeCategory));
    }
  }, []);

  // Update filtered items on category change
  useEffect(() => {
    const items = inventory.filter(item => item.category === activeCategory);
    console.log("Current category:", activeCategory);
    console.log("Filtered items:", items);
    setFilteredItems(items);
  }, [activeCategory, inventory]);
  return (
    <div className="vendor-page-container">
      <header className="vendor-header">
        <div className="top-bar">
          <h1 className="logo">VendorVerse</h1>

          <div className="right-header">
            <div className="location-selector-wrapper">
              <div className="location-selector" onClick={toggleDropdown}>
                <span>{selectedCity}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              {showDropdown && (
                <ul className="location-dropdown">
                  {locations.map((city) => (
                    <li key={city} onClick={() => selectCity(city)}>
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="search-bar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input type="text" placeholder='Search for "banana"' />
            </div>

            <div className="user-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Logout</span>
            </div>
          </div>
        </div>

        <div className="category-nav-container">
          <button className="scroll-arrow left" onClick={() => scroll(-250)}>&lt;</button>
          <nav className="category-nav" ref={navRef}>
            <ul>
              {categories.map((category) => (
                <li
                  key={category.name}
                  className={activeCategory === category.name ? 'active' : ''}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </nav>
          <button className="scroll-arrow right" onClick={() => scroll(250)}>&gt;</button>
        </div>
      </header>

      <section className="deals-section">
        <h2 className="deals-title">🔥 Deals of the Day</h2>
        <div className="deals-container">
          {inventory.slice(0, 5).map((deal, index) => (
            <div className="deal-card" key={index}>
              <div className="deal-image-placeholder">{deal.name.charAt(0)}</div>
              <p className="deal-name">{deal.name}</p>
              <p className="deal-offer">Limited Stock</p>
              <button className="deal-button">Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      <main className="product-section">
        <h2 className="section-title">{activeCategory}</h2>
        <div className="product-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-img-placeholder">
                  {product.name.charAt(0)}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.quality}</p>
                  <p className="text-xs text-gray-600">{product.quantity} • {product.price}</p>
                  <button className="add-btn">BUY</button>
                </div>
              </div>
            ))
          ) : (
              <p className="text-gray-500 mt-4">No items available in "{activeCategory}"</p>

          )}
        </div>
      </main>
    </div>
  );
};

export default Vendorhomepage;

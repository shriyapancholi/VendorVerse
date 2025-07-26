import React, { useState, useRef } from 'react';
import '../Vendorhomepage.css'; // Make sure to create and link this CSS file

// --- Data for the category navigation ---
const categories = [
    { name: 'Vegetables', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { name: 'Fruits', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h-7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/><path d="M8 8V7a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1"/></svg> },
    { name: 'Dairy', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { name: 'Oils', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18.9 7.1-8.3-5.4c-.5-.3-1.2-.3-1.7 0L.5 7.1c-.5.3-.5 1 0 1.3l8.3 5.4c.5.3 1.2.3 1.7 0l8.3-5.4c.5-.3.5-1 0-1.3Z"/><path d="M12 22V13.8"/><path d="M12 22a4.5 4.5 0 0 1-4.5-4.5v-2.1"/><path d="M12 22a4.5 4.5 0 0 0 4.5-4.5v-2.1"/><path d="M6.5 15.4l-6-3.9"/><path d="m17.5 15.4 6-3.9"/></svg> },
    { name: 'Groceries', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.3 3.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 0 1.4l-9 9A2 2 0 0 1 11 16H8a2 2 0 0 1-2-2v-3a2 2 0 0 1 .3-1z"/><path d="m14 7 3 3"/><path d="M5 21H3.6a2 2 0 0 1-2-2.3c.2-1.3.5-2.5.9-3.7"/><path d="M8.6 15.6c.2.2.4.4.7.5 1.1.6 2.4.9 3.7.9H19a2 2 0 0 0 2-2v-1.4c-.1-1.1-.4-2.2-.8-3.2"/></svg> },
    { name: 'Meat', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M20 12v4h-4"/><path d="M4 12H2"/><path d="M22 12h-2"/><path d="M12 20v2"/><path d="M12 2v2"/></svg> },
    { name: 'Ready-to-Use', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg> },
    { name: 'Processed Foods', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a2 2 0 0 0 2-2V7l-2-2-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 13H8.5a2.5 2.5 0 0 0-2.4 3.1L8 22"/><path d="M12 13h3.5a2.5 2.5 0 0 1 2.4 3.1L16 22"/><path d="M12 5V2"/><path d="M12 5c2.5 0 5-2.5 5-5"/><path d="M12 5C9.5 5 7 2.5 7 0"/></svg> },
    
];
const productData = {
  Vegetables: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Vegetable ${i + 1}`,
    image: `https://placehold.co/200x200/e2f5e8/333?text=Veg+${i + 1}`,
  })),
  Fruits: Array.from({ length: 15 }, (_, i) => ({
    id: i + 20,
    name: `Fruit ${i + 1}`,
    image: `https://placehold.co/200x200/ffeded/333?text=Fruit+${i + 1}`,
  })),
  Dairy: Array.from({ length: 15 }, (_, i) => ({
    id: i + 40,
    name: `Dairy ${i + 1}`,
    image: `https://placehold.co/200x200/fff3e2/333?text=Dairy+${i + 1}`,
  })),
  Oils: Array.from({ length: 15 }, (_, i) => ({
    id: i + 60,
    name: `Oil ${i + 1}`,
    image: `https://placehold.co/200x200/fdfde7/333?text=Oil+${i + 1}`,
  })),
  Groceries: Array.from({ length: 15 }, (_, i) => ({
    id: i + 80,
    name: `Grocery ${i + 1}`,
    image: `https://placehold.co/200x200/f0fff4/333?text=Grocery+${i + 1}`,
  })),
  Meat: Array.from({ length: 15 }, (_, i) => ({
    id: i + 100,
    name: `Meat ${i + 1}`,
    image: `https://placehold.co/200x200/ffeef0/333?text=Meat+${i + 1}`,
  })),
   "Ready-to-Use": Array.from({ length: 15 }, (_, i) => ({
    id: i + 120,
    name: `Ready Item ${i + 1}`,
    image: `https://placehold.co/200x200/e0f7fa/333?text=Ready+${i + 1}`,
  })),

  "Processed Foods": Array.from({ length: 15 }, (_, i) => ({
    id: i + 140,
    name: `Processed Food ${i + 1}`,
    image: `https://placehold.co/200x200/fce4ec/333?text=Processed+${i + 1}`,
  }))
};
const dealsOfTheDay = [
  {
    name: "Fresh Tomatoes",
    image: "https://placehold.co/150x150/e2f5e8/333?text=Tomato",
    offer: "30% OFF",
  },
  {
    name: "Almond Oil",
    image: "https://placehold.co/150x150/fef4e7/333?text=Oil",
    offer: "25% OFF",
  },
  {
    name: "Paneer Block",
    image: "https://placehold.co/150x150/fff3e2/333?text=Paneer",
    offer: "15% OFF",
  },
  {
    name: "Coconut",
    image: "https://placehold.co/150x150/def7e8/333?text=Coconut",
    offer: "35% OFF",
  },
  {
    name: "Ready Mix Poha",
    image: "https://placehold.co/150x150/fce4ec/333?text=Poha+Mix",
    offer: "20% OFF",
  },
];


const Vendorhomepage = () => {
    const [activeCategory, setActiveCategory] = useState('Vegetables');
    const navRef = useRef(null);

    const scroll = (scrollOffset) => {
        if (navRef.current) {
            navRef.current.scrollLeft += scrollOffset;
        }
    };
     const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select Location");
  const locations = ["Surat", "Ahmedabad", "Rajkot", "Vadodara", "Gandhinagar"];

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const selectCity = (city) => {
    setSelectedCity(city);
    setShowDropdown(false);
  };

    return (
         <div className="vendor-page-container">
            <header className="vendor-header">
               <div className="top-bar">
  <h1 className="logo">VendorVerse</h1>

  <div className="right-header">
    <div className="location-selector-wrapper">
  <div className="location-selector" onClick={toggleDropdown}>
    <span>{selectedCity}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" placeholder='Search for "banana"' />
    </div>

    <div className="user-action">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
    {dealsOfTheDay.map((deal, index) => (
      <div className="deal-card" key={index}>
        <img src={deal.image} alt={deal.name} className="deal-image" />
        <p className="deal-name">{deal.name}</p>
        <p className="deal-offer">{deal.offer}</p>
        <button className="deal-button">Buy Now</button>
      </div>
    ))}
  </div>
</section>

            <main className="product-section">
  <h2 className="section-title">{activeCategory}</h2>
  <div className="product-grid">
    {productData[activeCategory]?.map((product) => (
      <div key={product.id} className="product-card">
        <img src={product.image} alt={product.name} className="product-img" />
        <div className="product-info">
          <h3>{product.name}</h3>
          <button className="add-btn">BUY</button>

        </div>
      </div>
    ))}
  </div>
</main>

        </div>
    );
};

export default Vendorhomepage;

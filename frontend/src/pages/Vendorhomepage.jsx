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
    { name: 'Processed Foods ', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a2 2 0 0 0 2-2V7l-2-2-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 13H8.5a2.5 2.5 0 0 0-2.4 3.1L8 22"/><path d="M12 13h3.5a2.5 2.5 0 0 1 2.4 3.1L16 22"/><path d="M12 5V2"/><path d="M12 5c2.5 0 5-2.5 5-5"/><path d="M12 5C9.5 5 7 2.5 7 0"/></svg> },
    
];

const Vendorhomepage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const navRef = useRef(null);

    const scroll = (scrollOffset) => {
        if (navRef.current) {
            navRef.current.scrollLeft += scrollOffset;
        }
    };

    return (
         <div className="vendor-page-container">
            <header className="vendor-header">
                <div className="top-bar">
                    <div className="left-section">
                        <h1 className="logo">VendorVerse</h1>
                        <div className="location-selector">
                            <span>Select Location</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                    <div className="center-section">
                        <div className="search-bar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            <input type="text" placeholder='Search for "banana"' />
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="super-saver">
                            <span className="saver-text">SUPER SAVER</span>
                            <div className="toggle-bg">
                                <div className="toggle-switch"></div>
                            </div>
                        </div>
                        <div className="user-action">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span>Login</span>
                        </div>
                        <div className="user-action">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
                            <span>Cart</span>
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
        </div>
    );
};

export default Vendorhomepage;

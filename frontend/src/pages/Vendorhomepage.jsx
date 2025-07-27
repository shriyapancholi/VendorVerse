import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarrot, FaAppleAlt, FaCheese, FaOilCan, FaStore, FaDrumstickBite, FaLeaf, FaHotdog } from 'react-icons/fa';
import '../styles/Vendorhomepage.css'; // Ensure this path is correct

// Helper to map category names to icons
const categoryIcons = {
    'Vegetables': <FaCarrot color="#4CAF50" size={20} />,
    'Fruits': <FaAppleAlt color="#FF5722" size={20} />,
    'Dairy': <FaCheese color="#FFC107" size={20} />,
    'Oils': <FaOilCan color="#FF9800" size={20} />,
    'Groceries': <FaStore color="#3F51B5" size={20} />,
    'Meat': <FaDrumstickBite color="#E91E63" size={20} />,
    'Ready-to-Use': <FaLeaf color="#009688" size={20} />,
    'Processed Foods': <FaHotdog color="#9C27B0" size={20} />,
};

const Vendorhomepage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState({});
    const [deals, setDeals] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const navRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [categoryResponse, dealsResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/categories/'),
                    fetch('http://127.0.0.1:8000/api/deals/')
                ]);

                if (!categoryResponse.ok || !dealsResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const categoryData = await categoryResponse.json();
                const dealsData = await dealsResponse.json();
                
                const categoryList = categoryData.map(cat => ({ name: cat.name, icon: categoryIcons[cat.name] || <FaLeaf size={20} /> }));
                const productMap = categoryData.reduce((acc, cat) => {
                    acc[cat.name] = cat.products;
                    return acc;
                }, {});

                setCategories(categoryList);
                setProducts(productMap);
                setDeals(dealsData);
                
                if (categoryList.length > 0) {
                    setActiveCategory(categoryList[0].name);
                }

            } catch (error) {
                setError(error.message);
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

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

    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            await fetch('http://127.0.0.1:8000/api/users/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Logout failed on server:", error);
        } finally {
            localStorage.removeItem('authToken');
            navigate('/login');
        }
    };

    const getFilteredResults = () => {
        if (!searchQuery) {
            return { [activeCategory]: products[activeCategory] || [] };
        }
        return Object.entries(products).reduce((acc, [category, productList]) => {
            const matchingProducts = productList.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (matchingProducts.length > 0) {
                acc[category] = matchingProducts;
            }
            return acc;
        }, {});
    };

    const filteredResults = getFilteredResults();
    const isSearching = searchQuery.length > 0;

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
                                        <li key={city} onClick={() => selectCity(city)}>{city}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="search-bar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            <input 
                                type="text" 
                                placeholder='Search for products...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="user-action" onClick={handleLogout}>
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
            
            {!isSearching && (
                <section className="deals-section">
                    <h2 className="deals-title">🔥 Deals of the Day</h2>
                    <div className="deals-container">
                        {deals.map((deal) => (
                            <div className="deal-card" key={deal.id}>
                                <img src={deal.image} alt={deal.name} className="deal-image" />
                                <p className="deal-name">{deal.name}</p>
                                {deal.offer && <p className="deal-offer">{deal.offer}</p>}
                                <button className="deal-button" onClick={() => navigate(`/buy/${deal.id}`)}>Buy Now</button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <main className="product-section">
                {loading && <p>Loading products...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                    <>
                        {isSearching ? (
                            <>
                                <h2 className="section-title">Search Results for "{searchQuery}"</h2>
                                {Object.keys(filteredResults).length > 0 ? (
                                    Object.entries(filteredResults).map(([category, products]) => (
                                        <div key={category}>
                                            <h3 className="category-subtitle">{category}</h3>
                                            <div className="product-grid">
                                                {products.map(product => (
                                                    <div key={product.id} className="product-card">
                                                        <img src={product.image} alt={product.name} className="product-img" />
                                                        <div className="product-info">
                                                            <h3>{product.name}</h3>
                                                            <button className="add-btn" onClick={() => navigate(`/buy/${product.id}`)}>BUY</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-products-message">No products found for "{searchQuery}".</p>
                                )}
                            </>
                        ) : (
                            <>
                                <h2 className="section-title">{activeCategory}</h2>
                                <div className="product-grid">
                                    {filteredResults[activeCategory]?.length > 0 ? (
                                        filteredResults[activeCategory].map((product) => (
                                            <div key={product.id} className="product-card">
                                                <img src={product.image} alt={product.name} className="product-img" />
                                                <div className="product-info">
                                                    <h3>{product.name}</h3>
                                                    <button className="add-btn" onClick={() => navigate(`/buy/${product.id}`)}>BUY</button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-products-message">No products currently available in {activeCategory}.</p>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Vendorhomepage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BuyingPage.css';

const BuyingPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [supplierOfferings, setSupplierOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOffering, setSelectedOffering] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setSupplierOfferings(data.suppliers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const calculateDiscountedTotal = (basePrice, quantity) => {
    let discount = 0;
    if (quantity >= 5 && quantity < 10) discount = 0.05;
    else if (quantity >= 10 && quantity < 20) discount = 0.1;
    else if (quantity >= 20) discount = 0.15;
    const total = basePrice * quantity;
    return Math.round(total - total * discount);
  };

  const handleSelect = (offering, e) => {
    const rect = e.target.getBoundingClientRect();
    setCardPosition({
      top: rect.top + window.scrollY - 40,
      left: rect.left + rect.width - 80
    });
    setSelectedOffering(offering);
    setQuantity(1);
    setCartMessage('');
  };

  const handleAddToCart = async () => {
    // ... (handleAddToCart logic remains the same)
  };

  if (loading) return <div className="loading-container">Loading Details...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="buying-page-container">
      <header className="buying-page-header">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
        <h1>Available Suppliers for {product?.name}</h1>
      </header>

      <main className="supplier-grid">
        {supplierOfferings.length > 0 ? (
          supplierOfferings.map(offering => (
            <div key={offering.supplier.id} className="supplier-card">
              <img
                src={offering.supplier.image || `https://placehold.co/200x150/a7c5ff/333?text=${offering.supplier.name}`}
                alt={offering.supplier.name}
                className="supplier-image"
              />
              <div className="supplier-info">
                <h3 className="supplier-name">{offering.supplier.name}</h3>
                <div className="supplier-meta">
                  <span>⭐ {offering.supplier.rating}</span>
                  <span>•</span>
                  <span>{offering.supplier.delivery_time}</span>
                  {/* --- NEW: Contact Button --- */}
                  {offering.supplier.phone_number && (
                    <a href={`tel:${offering.supplier.phone_number}`} className="contact-supplier-btn">
                      Contact
                    </a>
                  )}
                </div>
                <div className="supplier-pricing">
                  <span className="price-amount">₹{parseFloat(offering.price).toFixed(2)}</span>
                  <span className="price-unit">/{offering.unit}</span>
                </div>
                <button
                  className="select-supplier-btn"
                  onClick={(e) => handleSelect(offering, e)}
                >
                  Select
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No suppliers found for this product.</p>
        )}
      </main>

      {/* Floating card on select */}
      {selectedOffering && (
        <div
          className="floating-card"
          style={{
            top: `${cardPosition.top}px`,
            left: `${cardPosition.left}px`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>{selectedOffering.supplier.name}</h3>
            <button onClick={() => setSelectedOffering(null)} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
          </div>
          <p style={{ color: '#ef4444', marginBottom: '4px' }}>
            📍 {selectedOffering.supplier.address || "Address not available"}
          </p>
          <p>Base Price: ₹{parseFloat(selectedOffering.price).toFixed(2)}/{selectedOffering.unit}</p>
          <div style={{ marginTop: '0.75rem' }}>
            <label>Quantity (in {selectedOffering.unit}):</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: '60px', marginLeft: '0.5rem' }}
            />
          </div>
          <p style={{ marginTop: '0.5rem' }}>Total: ₹{calculateDiscountedTotal(selectedOffering.price, quantity)}</p>
          <div className="button-row">
            <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-btn">Buy Now</button>
          </div>
          {cartMessage && <p className="cart-message">{cartMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default BuyingPage;

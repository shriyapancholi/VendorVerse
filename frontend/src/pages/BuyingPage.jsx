import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BuyingPage.css';

const BuyingPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/suppliers/`);
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, [productId]);

  const calculatePrice = (basePrice, quantity) => {
    let discount = 0;
    if (quantity >= 5 && quantity < 10) discount = 0.05;
    else if (quantity >= 10 && quantity < 20) discount = 0.1;
    else if (quantity >= 20) discount = 0.15;
    const total = basePrice * quantity;
    return Math.round(total - total * discount);
  };

  if (loading) return <div className="loading-container">Loading Suppliers...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="buying-page-container">
      <header className="buying-page-header">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
        <h1>Available Suppliers</h1>
      </header>

      <main className="supplier-grid">
        {suppliers.length > 0 ? (
          suppliers.map(supplier => (
            <div key={supplier.id} className="supplier-card">
              <img 
                src={supplier.image || `https://placehold.co/200x150/a7c5ff/333?text=${supplier.name}`} 
                alt={supplier.name} 
                className="supplier-image" 
              />
              <div className="supplier-info">
                <h3 className="supplier-name">{supplier.name}</h3>
                <div className="supplier-meta">
                  <span>⭐ {supplier.rating}</span>
                  <span>•</span>
                  <span>{supplier.delivery_time}</span>
                </div>
                <button 
                  className="select-supplier-btn"
                  onClick={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    setCardPosition({
                      top: rect.bottom + window.scrollY + 10,
                      left: rect.left + rect.width / 2
                    });
                    setSelectedSupplier(supplier);
                    setQuantity(1);
                  }}
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

      {selectedSupplier && (
        <div 
          className="floating-card"
          style={{
            top: `${cardPosition.top}px`,
            left: `${cardPosition.left}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <button className="close-btn" onClick={() => setSelectedSupplier(null)}>✕</button>

          <h3>{selectedSupplier.name}</h3>
          <p className="address">📍 {selectedSupplier.address || "Gandhinagar, Gujarat"}</p>
          <p className="base-price">Base Price: ₹{selectedSupplier.base_price || 50}/kg</p>

          <div className="quantity-block">
            <label>Quantity (kg):</label>
            <input 
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <p className="price-summary">
            Total: ₹{calculatePrice(selectedSupplier.base_price || 50, quantity)}
          </p>

          <div className="button-actions">
            <button className="add-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyingPage;


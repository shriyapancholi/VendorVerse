import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BuyingPage.css';

const BuyingPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  // This will now store the combined supplier and pricing info
  const [supplierOfferings, setSupplierOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        // The supplier data is now in a nested 'suppliers' array
        setSupplierOfferings(data.suppliers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

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
                </div>
                
                {/* --- MODIFIED: Display the price from the offering --- */}
                <div className="supplier-pricing">
                  <span className="price-amount">₹{parseFloat(offering.price).toFixed(2)}</span>
                  <span className="price-unit">{offering.unit}</span>
                </div>

                <button className="select-supplier-btn">Select</button>
              </div>
            </div>
          ))
        ) : (
          <p>No suppliers found for this product.</p>
        )}
      </main>
    </div>
  );
};

export default BuyingPage;

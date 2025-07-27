import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BuyingPage.css'; // We will create this CSS file

const BuyingPage = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/suppliers/`);
        if (!response.ok) {
          throw new Error('Failed to fetch suppliers');
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [productId]); // Re-run the effect if the productId changes

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

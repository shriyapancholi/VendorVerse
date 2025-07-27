import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CartPage.css'; // Make sure this CSS file exists

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartDetails = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/cart/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart details.');
        }
        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, [navigate]);

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/items/${itemId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart.');
      }

      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.id !== itemId)
      }));

    } catch (err) {
      console.error(err.message);
    }
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  if (loading) return <div className="loading-container">Loading Cart...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="cart-page-container">
      <header className="cart-page-header">
        <button onClick={() => navigate(-1)} className="back-button">← Continue Shopping</button>
        <h1>Your Shopping Cart</h1>
      </header>

      <main className="cart-content">
        <div className="cart-items-list">
          {cart && cart.items && cart.items.length > 0 ? (
            cart.items.map(item => (
              <div key={item.id} className="cart-item-card">
                <div className="item-details">
                  <h3 className="item-name">{item.product_name}</h3>
                  <p className="item-supplier">Sold by: {item.supplier_name}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <span className="item-price">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                  <button onClick={() => handleRemoveItem(item.id)} className="remove-item-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart-message">Your cart is empty.</p>
          )}
        </div>

        {cart && cart.items && cart.items.length > 0 && (
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹20.00</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{(calculateSubtotal() + 20).toFixed(2)}</span>
            </div>
            {/* --- MODIFIED: This button now navigates to the checkout page --- */}
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;

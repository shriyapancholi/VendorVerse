import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css'; // Create this new CSS file

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State for the form
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchCartDetails = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:8000/api/cart/', {
          headers: { 'Authorization': `Token ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch cart.');
        const data = await response.json();
        if (data.items.length === 0) {
            navigate('/vendorhomepage'); // Redirect if cart is empty
        }
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCartDetails();
  }, [navigate]);

  const calculateSubtotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!address || !phoneNumber) {
      setFormError('Address and phone number are required.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const payload = { address, phone_number: phoneNumber, payment_method: paymentMethod };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order.');
      }
      // Navigate to a success page
      navigate('/order-success');
    } catch (err) {
      setFormError(err.message);
    }
  };

  if (loading) return <div>Loading Checkout...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>
      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <div className="form-section">
          <h2>Shipping Details</h2>
          <textarea
            placeholder="Enter your full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-section">
          <h2>Payment Method</h2>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option>Cash on Delivery</option>
            <option disabled>Online Payment (Coming Soon)</option>
          </select>
        </div>

        <div className="order-summary-checkout">
          <h2>Order Summary</h2>
          {cart?.items.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.quantity} x {item.product_name}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total-checkout">
            <span>Total</span>
            <span>₹{(calculateSubtotal() + 20).toFixed(2)}</span>
          </div>
        </div>
        
        {formError && <p className="form-error">{formError}</p>}
        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;

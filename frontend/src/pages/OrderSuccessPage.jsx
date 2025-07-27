import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CheckoutPage.css'; // Can reuse the same CSS

const OrderSuccessPage = () => {
  return (
    <div className="order-success-container">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order details will be sent to the seller.</p>
      <Link to="/vendorhomepage" className="back-to-home-btn">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccessPage;

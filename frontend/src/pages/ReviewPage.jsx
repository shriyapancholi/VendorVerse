// src/pages/ReviewPage.jsx
import React from "react";
import SupplierHeader from "../components/SupplierHeader";
import SupplierReviews from "../components/SupplierReviews";
import "../styles/SupplierDashboard.css"; // reuse dashboard styling

export default function ReviewPage() {
  return (
    <div className="supplier-dashboard">
      <SupplierHeader />

      <div className="dashboard-main">
        <h2 style={{ marginBottom: "1rem" }}>Supplier Ratings & Reviews</h2>
        <SupplierReviews />
      </div>
    </div>
  );
}

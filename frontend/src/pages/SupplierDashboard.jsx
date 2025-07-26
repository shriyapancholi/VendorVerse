import React, { useState } from "react";
import "../SupplierDashboard.css";
import SupplierHeader from "../components/SupplierHeader";
import CategoryNav from "../components/CategoryNav";
import InventoryList from "../components/InventoryList";
import AddInventoryModal from "../components/AddInventoryModal";
import SupplierReviews from "./ReviewPage";
import { useNavigate } from "react-router-dom";

export default function SupplierDashboard() {
     const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showAddModal, setShowAddModal] = useState(false);
    const [inventory, setInventory] = useState([]);

    const handleAddItem = (item) => {
        setInventory((prev) => [...prev, item]);
        setShowAddModal(false);
    };

   return (
    <div className="supplier-dashboard">
      <SupplierHeader />
      <CategoryNav selected={selectedCategory} setSelected={setSelectedCategory} />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Your Inventory</h2>
          <div className="flex gap-2">
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              + Add New Item
            </button>
            <button
              className="add-btn"
              style={{ backgroundColor: "#6366f1" }}
              onClick={() => navigate("/dashboard/review")}
            >
              ⭐ View Reviews
            </button>
          </div>
        </div>

        <InventoryList items={inventory} categoryFilter={selectedCategory} />
      </div>

      {showAddModal && (
        <AddInventoryModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
}
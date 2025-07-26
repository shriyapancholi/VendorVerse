import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const dummyItems = [
      {
        id: 1,
        name: "Fresh Tomatoes",
        quantity: "5 kg",
        quality: "Grade A - Fresh",
        expiry: "3 days",
        price: "₹40/kg",
        category: "Vegetables",
        isLowStock: false,
      },
      {
        id: 2,
        name: "Full Cream Milk",
        quantity: "10 L",
        quality: "Amul - Fresh",
        expiry: "2 days",
        price: "₹60/L",
        category: "Dairy",
        isLowStock: false,
      },
      {
        id: 3,
        name: "Green Chilies",
        quantity: "1 kg",
        quality: "Spicy and fresh",
        expiry: "2 days",
        price: "₹70/kg",
        category: "Vegetables",
        isLowStock: true,
      },
      {
        id: 4,
        name: "Masala Dosa Batter",
        quantity: "3 kg",
        quality: "Home-made, fermented",
        expiry: "1 day",
        price: "₹90/kg",
        category: "Batter",
        isLowStock: false,
      },
      {
        id: 5,
        name: "Cooking Oil",
        quantity: "15 L",
        quality: "Refined Sunflower Oil",
        expiry: "10 days",
        price: "₹120/L",
        category: "Oils",
        isLowStock: false,
      },
      {
        id: 6,
        name: "Onions",
        quantity: "6 kg",
        quality: "Pink, fresh batch",
        expiry: "4 days",
        price: "₹25/kg",
        category: "Vegetables",
        isLowStock: true,
      },
      {
        id: 7,
        name: "Pav Buns",
        quantity: "50 pcs",
        quality: "Fresh bakery stock",
        expiry: "1 day",
        price: "₹3/piece",
        category: "Bakery",
        isLowStock: false,
      },
      {
        id: 8,
        name: "Sweet Corn",
        quantity: "2 kg",
        quality: "Boiled and packed",
        expiry: "2 days",
        price: "₹90/kg",
        category: "Ready-to-Serve",
        isLowStock: false,
      }
    ];
    setInventory(dummyItems);
  }, []);

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
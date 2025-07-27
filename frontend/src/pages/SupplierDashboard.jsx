import React, { useState, useEffect } from "react";
import "../styles/SupplierDashboard.css";
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

  const handleAddItem = async (item) => {
    try {
      const response = await fetch("http://localhost:8000/api/inventory/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) throw new Error("Failed to add item");

      const newItem = await response.json();
      setInventory(prev => [...prev, newItem]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/inventory/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      setInventory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/inventory/"); // replace with your backend API URL
        const data = await response.json();

        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);
  

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
        <SupplierHeader />
        <CategoryNav selected={selectedCategory} setSelected={setSelectedCategory} />

        <div className="dashboard-main">
          <div className="flex justify-between items-center mt-8 mb-4 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Inventory</h2>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowAddModal(true)}
                className="white-btn"
              >
                + Add New Item
              </button>

              <button
                onClick={() => navigate("/dashboard/review")}
                className="white-btn"
              >
                ⭐ View Reviews
              </button>

              <button
                onClick={() => navigate("/dashboard/analytics")}
                className="white-btn"
              >
                📊 Analytics
              </button>
            </div>
          </div>

          <InventoryList
            items={inventory}
            categoryFilter={selectedCategory}
            onDelete={handleDeleteItem}
          />

        </div>
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

import React, { useState } from "react";
import "../SupplierDashboard.css";
import SupplierHeader from "../components/SupplierHeader";
import CategoryNav from "../components/CategoryNav";
import InventoryList from "../components/InventoryList";
import AddInventoryModal from "../components/AddInventoryModal";

export default function SupplierDashboard() {
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
                    <button className="add-btn" onClick={() => setShowAddModal(true)}>
                        + Add New Item
                    </button>
                </div>

                <InventoryList items={inventory} categoryFilter={selectedCategory} />
            </div>

            {showAddModal && (
                <AddInventoryModal onClose={() => setShowAddModal(false)} onAdd={handleAddItem} />
            )}
        </div>
    );
}

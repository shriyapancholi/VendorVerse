import React, { useState } from "react";

export default function AddInventoryModal({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "Vegetables",
        description: "",
        quantity: "",
        unit: "kg",
        price: "",
        barterValue: "",
        quality: "",
        expiry: "",
        status: "In Stock",
        surplus: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    return (
        <div className="modal-overlay">
            <form className="modal-content" onSubmit={handleSubmit}>
                <h3>Add Inventory Item</h3>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="description" placeholder="Description" onChange={handleChange} />
                <select name="category" onChange={handleChange}>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Dairy</option>
                    <option>Oils</option>
                    <option>Groceries</option>
                    <option>Meat</option>
                    <option>Ready-to-Use</option>
                    <option>Processed Foods</option>
                </select>
                <input name="quantity" placeholder="Quantity" onChange={handleChange} required />
                <input name="unit" placeholder="Unit (e.g. kg)" onChange={handleChange} />
                <input name="price" placeholder="Selling Price" onChange={handleChange} />
                <input name="barterValue" placeholder="Barter Value" onChange={handleChange} />
                <input name="quality" placeholder="Quality Grade/Notes" onChange={handleChange} />
                <input name="expiry" type="date" placeholder="Expiry Date" onChange={handleChange} />
                <select name="status" onChange={handleChange}>
                    <option>In Stock</option>
                    <option>Out of Stock</option>
                    <option>Coming Soon</option>
                </select>
                <div className="surplus-container">
                    <span>Mark as Surplus</span>
                    <input type="checkbox" name="surplus" onChange={handleChange} />
                </div>


                <div className="modal-actions">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit">Add Item</button>
                </div>

            </form>
        </div>
    );
}

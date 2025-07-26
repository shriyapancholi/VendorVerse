import React from "react";

export default function InventoryList({ items, categoryFilter }) {
    const filtered = categoryFilter === "All"
        ? items
        : items.filter((item) => item.category === categoryFilter);

    return (
        <div className="inventory-list">
            {filtered.length === 0 ? (
                <p className="empty">No items in this category yet.</p>
            ) : (
                filtered.map((item, idx) => (
                    <div className="inventory-card" key={idx}>
                        <div>
                            <strong>{item.name}</strong>
                            <p>{item.description}</p>
                            <p>{item.quantity} {item.unit}</p>
                            <p>₹{item.price}</p>
                            <p>Quality: {item.quality}</p>
                            <p>Status: {item.status}</p>
                        </div>
                        {item.surplus && <span className="surplus-tag">Surplus</span>}
                    </div>
                ))
            )}
        </div>
    );
}
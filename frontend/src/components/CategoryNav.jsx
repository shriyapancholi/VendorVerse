import React from "react";

const categories = [
    "All", "Vegetables", "Fruits", "Dairy", "Oils",
    "Groceries", "Meat", "Ready-to-Use", "Processed Foods"
];

export default function CategoryNav({ selected, setSelected }) {
    return (
        <div className="category-nav">
            {categories.map((cat) => (
                <button
                    key={cat}
                    className={selected === cat ? "active" : ""}
                    onClick={() => setSelected(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

import React from "react";

const categories = [
  "All", "Vegetables", "Fruits", "Dairy", "Oils",
  "Groceries", "Meat", "Ready-to-Use", "Processed Foods"
];

export default function CategoryNav({ selected, setSelected }) {
  return (
    <div className="category-nav">
      {["All", "Vegetables", "Fruits", "Dairy", "Oils", "Groceries", "Meat", "Ready-to-Use", "Processed Foods"].map(
        (category) => (
          <button
            key={category}
            className={selected === category ? "active" : ""}
            onClick={() => setSelected(category)}
          >
            {category}
          </button>
        )
      )}
    </div>
  
  );
}

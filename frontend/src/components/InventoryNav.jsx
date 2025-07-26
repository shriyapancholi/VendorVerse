import React from "react";

export default function InventoryList({ items, categoryFilter }) {
    const filtered = categoryFilter === "All"
        ? items
        : items.filter((item) => item.category === categoryFilter);

    return (
        <div
  key={idx}
  className={`relative ${colorClass} border-2 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-200 ease-in-out`}
>
  {/* Surplus tag */}
  {item.surplus && (
    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
      Surplus
    </span>
  )}

  {/* Item Info */}
  <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
  <p className="text-sm text-gray-700">{item.quantity} {item.unit}</p>
  <p className="text-base text-green-800 font-semibold">₹{item.price}</p>
  <p className="text-sm text-gray-800">Quality: {item.quality}</p>
  <p className="text-sm text-gray-800">Status: {item.status || "—"}</p>
</div>
    )
}
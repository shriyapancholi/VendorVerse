// // import React from "react";

// // export default function InventoryList({ items, categoryFilter }) {
// //     const filtered = categoryFilter === "All"
// //         ? items
// //         : items.filter((item) => item.category === categoryFilter);

// //     return (
// //         <div className="inventory-list">
// //             {filtered.length === 0 ? (
// //                 <p className="empty">No items in this category yet.</p>
// //             ) : (
// //                 filtered.map((item, idx) => (
// //                     <div className="inventory-card" key={idx}>
// //                         <div>
// //                             <strong>{item.name}</strong>
// //                             <p>{item.description}</p>
// //                             <p>{item.quantity} {item.unit}</p>
// //                             <p>₹{item.price}</p>
// //                             <p>Quality: {item.quality}</p>
// //                             <p>Status: {item.status}</p>
// //                         </div>
// //                         {item.surplus && <span className="surplus-tag">Surplus</span>}
// //                     </div>
// //                 ))
// //             )}
// //         </div>
// //     );
// // }

// import React from "react";

// export default function InventoryList({ items, categoryFilter }) {
//   const filtered = categoryFilter === "All"
//     ? items
//     : items.filter((item) => item.category === categoryFilter);

//   // 💡 Define strong color themes by category
//   const categoryColors = {
//     Vegetables: "bg-green-200 border-green-600",
//     Fruits: "bg-orange-200 border-orange-600",
//     Dairy: "bg-yellow-200 border-yellow-600",
//     Oils: "bg-amber-200 border-amber-600",
//     Groceries: "bg-blue-200 border-blue-600",
//     Meat: "bg-red-200 border-red-600",
//     "Ready-to-Use": "bg-purple-200 border-purple-600",
//     "Processed Foods": "bg-pink-200 border-pink-600",
//     Bakery: "bg-rose-200 border-rose-600",
//     Batter: "bg-indigo-200 border-indigo-600",
//     Default: "bg-slate-300 border-slate-600",
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-4">
//       {filtered.length === 0 ? (
//         <p className="text-center text-gray-500 col-span-full">No items in this category yet.</p>
//       ) : (
//         filtered.map((item, idx) => {
//           const colorClass = categoryColors[item.category] || categoryColors.Default;

//           return (
//             <div
//               key={idx}
//               className={`relative ${colorClass} border-2 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-200 ease-in-out`}
//             >
//               {/* Surplus tag */}
//               {item.surplus && (
//                 <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
//                   Surplus
//                 </span>
//               )}

//               {/* Item Info */}
//               <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
//               <p className="text-sm text-gray-700">
//                 {item.quantity} {item.unit}
//               </p>
//               <p className="text-base text-green-800 font-semibold">₹{item.price}</p>
//               <p className="text-sm text-gray-800">Quality: {item.quality}</p>
//               <p className="text-sm text-gray-800">Status: {item.status || "—"}</p>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

import React from "react";

export default function InventoryList({ items, categoryFilter }) {
  const filtered = categoryFilter === "All"
    ? items
    : items.filter((item) => item.category === categoryFilter);

  const categoryColors = {
    Vegetables: "bg-green-200 border-green-600",
    Fruits: "bg-orange-200 border-orange-600",
    Dairy: "bg-yellow-200 border-yellow-600",
    Oils: "bg-amber-200 border-amber-600",
    Groceries: "bg-blue-200 border-blue-600",
    Meat: "bg-red-200 border-red-600",
    "Ready-to-Use": "bg-purple-200 border-purple-600",
    "Processed Foods": "bg-pink-200 border-pink-600",
    Bakery: "bg-rose-200 border-rose-600",
    Batter: "bg-indigo-200 border-indigo-600",
    Default: "bg-slate-300 border-slate-600",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-4">
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">No items in this category yet.</p>
      ) : (
        filtered.map((item, idx) => {
          const colorClass = categoryColors[item.category] || categoryColors.Default;

          return (
            <div
              key={idx}
              className={`relative ${colorClass} border-2 rounded-2xl p-5 shadow-md hover:shadow-xl transform transition-transform duration-200 hover:-translate-y-1`}
            >
              {/* Surplus tag */}
              {item.surplus && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  Surplus
                </span>
              )}

              {/* Item Info */}
              <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-700">{item.quantity}</p>
              <p className="text-base text-green-800 font-semibold">{item.price}</p>
              <p className="text-sm text-gray-800">Quality: {item.quality}</p>
              <p className="text-sm text-gray-800">Status: {item.status || "—"}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

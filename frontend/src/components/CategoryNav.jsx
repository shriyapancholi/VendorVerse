// import React from "react";

// const categories = [
//     "All", "Vegetables", "Fruits", "Dairy", "Oils",
//     "Groceries", "Meat", "Ready-to-Use", "Processed Foods"
// ];

// export default function CategoryNav({ selected, setSelected }) {
//     return (
//         <div className="category-nav">
//             {categories.map((cat) => (
//                 <button
//                     key={cat}
//                     className={selected === cat ? "active" : ""}
//                     onClick={() => setSelected(cat)}
//                 >
//                     {cat}
//                 </button>
//             ))}
//         </div>
//     );
// }

import React from "react";

const categories = [
  "All", "Vegetables", "Fruits", "Dairy", "Oils",
  "Groceries", "Meat", "Ready-to-Use", "Processed Foods"
];

export default function CategoryNav({ selected, setSelected }) {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ease-in-out
            ${
              selected === cat
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

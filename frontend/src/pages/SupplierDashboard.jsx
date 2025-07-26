// import React, { useState, useEffect } from "react";
// import "../styles/SupplierDashboard.css";
// import SupplierHeader from "../components/SupplierHeader";
// import CategoryNav from "../components/CategoryNav";
// import InventoryList from "../components/InventoryList";
// import AddInventoryModal from "../components/AddInventoryModal";
// import SupplierReviews from "./ReviewPage";
// import { useNavigate } from "react-router-dom";

// export default function SupplierDashboard() {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [inventory, setInventory] = useState([]);

//   const handleAddItem = (item) => {
//     setInventory((prev) => [...prev, item]);
//     setShowAddModal(false);
//   };

//   useEffect(() => {
//     const dummyItems = [
//       {
//         id: 1,
//         name: "Fresh Tomatoes",
//         quantity: "5 kg",
//         quality: "Grade A - Fresh",
//         expiry: "3 days",
//         price: "₹40/kg",
//         category: "Vegetables",
//         isLowStock: false,
//       },
//       {
//         id: 2,
//         name: "Full Cream Milk",
//         quantity: "10 L",
//         quality: "Amul - Fresh",
//         expiry: "2 days",
//         price: "₹60/L",
//         category: "Dairy",
//         isLowStock: false,
//       },
//       {
//         id: 3,
//         name: "Green Chilies",
//         quantity: "1 kg",
//         quality: "Spicy and fresh",
//         expiry: "2 days",
//         price: "₹70/kg",
//         category: "Vegetables",
//         isLowStock: true,
//       },
//       {
//         id: 4,
//         name: "Masala Dosa Batter",
//         quantity: "3 kg",
//         quality: "Home-made, fermented",
//         expiry: "1 day",
//         price: "₹90/kg",
//         category: "Batter",
//         isLowStock: false,
//       },
//       {
//         id: 5,
//         name: "Cooking Oil",
//         quantity: "15 L",
//         quality: "Refined Sunflower Oil",
//         expiry: "10 days",
//         price: "₹120/L",
//         category: "Oils",
//         isLowStock: false,
//       },
//       {
//         id: 6,
//         name: "Onions",
//         quantity: "6 kg",
//         quality: "Pink, fresh batch",
//         expiry: "4 days",
//         price: "₹25/kg",
//         category: "Vegetables",
//         isLowStock: true,
//       },
//       {
//         id: 7,
//         name: "Pav Buns",
//         quantity: "50 pcs",
//         quality: "Fresh bakery stock",
//         expiry: "1 day",
//         price: "₹3/piece",
//         category: "Bakery",
//         isLowStock: false,
//       },
//       {
//         id: 8,
//         name: "Sweet Corn",
//         quantity: "2 kg",
//         quality: "Boiled and packed",
//         expiry: "2 days",
//         price: "₹90/kg",
//         category: "Ready-to-Serve",
//         isLowStock: false,
//       }
//     ];
//     setInventory(dummyItems);
//   }, []);

//   return (
//   <div className="min-h-screen bg-white px-4 md:px-12 py-6">

//       <SupplierHeader />
//       <CategoryNav selected={selectedCategory} setSelected={setSelectedCategory} />

//       <div className="dashboard-main">
//         <div className="flex justify-between items-center mt-8 mb-4 flex-wrap gap-4"><h2 className="text-2xl font-bold text-gray-800">Your Inventory</h2>

// <div className="flex gap-3">
//   <button
//     onClick={() => setShowAddModal(true)}
//     className="px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-400 cursor-not-allowed opacity-70 shadow-sm"
//   >
//     + Add New Item
//   </button>

//   <button
//     onClick={() => navigate("/dashboard/review")}
//     className="px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-400 cursor-not-allowed opacity-70 shadow-sm flex items-center gap-1"
//   >
//     ⭐ View Reviews
//   </button>

//   <button
//     onClick={() => navigate("/dashboard/analytics")}
//     className="px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-400 cursor-not-allowed opacity-70 shadow-sm flex items-center gap-1"
//   >
//     📊 Analytics
//   </button>
// </div>


//         </div>

//         <InventoryList items={inventory} categoryFilter={selectedCategory} />
//       </div>

//       {showAddModal && (
//         <AddInventoryModal
//           onClose={() => setShowAddModal(false)}
//           onAdd={handleAddItem}
//         />
//       )}
//     </div>
//   );
// }

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
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium px-4 py-2 rounded-md shadow transition"
              >
                + Add New Item
              </button>

              <button
                onClick={() => navigate("/dashboard/review")}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium px-4 py-2 rounded-md shadow transition flex items-center gap-1"
              >
                ⭐ View Reviews
              </button>

              <button
                onClick={() => navigate("/dashboard/analytics")}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium px-4 py-2 rounded-md shadow transition flex items-center gap-1"
              >
                📊 Analytics
              </button>
            </div>
          </div>

          <InventoryList items={inventory} categoryFilter={selectedCategory} />
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

// import React, { useState } from "react";

// export default function AddInventoryModal({ onClose, onAdd }) {
//     const [formData, setFormData] = useState({
//         name: "",
//         category: "Vegetables",
//         description: "",
//         quantity: "",
//         unit: "kg",
//         price: "",
//         barterValue: "",
//         quality: "",
//         expiry: "",
//         status: "In Stock",
//         surplus: false,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onAdd(formData);
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" ? checked : value
//         }));
//     };

//     return (
//         <div className="modal-overlay">
//             <form className="modal-content" onSubmit={handleSubmit}>
//                 <h3>Add Inventory Item</h3>
//                 <input name="name" placeholder="Name" onChange={handleChange} required />
//                 <input name="description" placeholder="Description" onChange={handleChange} />
//                 <select name="category" onChange={handleChange}>
//                     <option>Vegetables</option>
//                     <option>Fruits</option>
//                     <option>Dairy</option>
//                     <option>Oils</option>
//                     <option>Groceries</option>
//                     <option>Meat</option>
//                     <option>Ready-to-Use</option>
//                     <option>Processed Foods</option>
//                 </select>
//                 <input name="quantity" placeholder="Quantity" onChange={handleChange} required />
//                 <input name="unit" placeholder="Unit (e.g. kg)" onChange={handleChange} />
//                 <input name="price" placeholder="Selling Price" onChange={handleChange} />
//                 <input name="barterValue" placeholder="Barter Value" onChange={handleChange} />
//                 <input name="quality" placeholder="Quality Grade/Notes" onChange={handleChange} />
//                 <input name="expiry" type="date" placeholder="Expiry Date" onChange={handleChange} />
//                 <select name="status" onChange={handleChange}>
//                     <option>In Stock</option>
//                     <option>Out of Stock</option>
//                     <option>Coming Soon</option>
//                 </select>
//                 <div className="surplus-container">
//                     <span>Mark as Surplus</span>
//                     <input type="checkbox" name="surplus" onChange={handleChange} />
//                 </div>


//                 <div className="modal-actions">
//                     <button type="button" onClick={onClose}>Cancel</button>
//                     <button type="submit">Add Item</button>
//                 </div>

//             </form>
//         </div>
//     );
// }


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
    if (!formData.name || !formData.quantity || !formData.price) return;
    onAdd(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add Inventory Item
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
              placeholder="e.g. Fresh Tomatoes"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Description
            </label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
              placeholder="e.g. Fresh batch"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
            >
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Dairy</option>
              <option>Oils</option>
              <option>Groceries</option>
              <option>Meat</option>
              <option>Ready-to-Use</option>
              <option>Processed Foods</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
            >
              <option>In Stock</option>
              <option>Out of Stock</option>
              <option>Coming Soon</option>
            </select>
          </div>

          <div className="flex gap-4 sm:col-span-2">
            <div className="flex-1">
              <label className="block mb-1 text-sm text-gray-600">
                Quantity
              </label>
              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-sm"
                placeholder="e.g. 5"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block mb-1 text-sm text-gray-600">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-sm"
              >
                <option>kg</option>
                <option>L</option>
                <option>g</option>
                <option>ml</option>
                <option>pieces</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Selling Price
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
              placeholder="e.g. ₹40/kg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Barter Value (optional)
            </label>
            <input
              name="barterValue"
              value={formData.barterValue}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
              placeholder="e.g. 3kg onions"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Quality Grade / Notes
            </label>
            <input
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
              placeholder="Grade A / Home-made / etc"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Expiry Date
            </label>
            <input
              name="expiry"
              type="date"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div className="flex items-center gap-2 col-span-2 mt-2">
            <input
              type="checkbox"
              name="surplus"
              checked={formData.surplus}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="surplus" className="text-sm text-gray-600">
              Mark as Surplus
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-500 font-medium shadow-sm transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-500 font-medium shadow-sm transition-all"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import SupplierReviews from "../components/SupplierReviews";

export default function ReviewPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">Ratings & Reviews by Vendors</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-2 px-4 rounded-md shadow transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6">
        
        <SupplierReviews />
      </div>
    </div>
  );
}

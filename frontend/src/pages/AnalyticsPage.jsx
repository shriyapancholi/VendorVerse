import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const monthlyData = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5200 },
  { month: "Apr", sales: 3900 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 4500 },
  { month: "Jul", sales: 7000 },
  { month: "Aug", sales: 6700 },
  { month: "Sep", sales: 4900 },
  { month: "Oct", sales: 5300 },
  { month: "Nov", sales: 5800 },
  { month: "Dec", sales: 7500 },
];

const yearlyData = [
  { year: "2021", total: 56000 },
  { year: "2022", total: 67000 },
  { year: "2023", total: 73000 },
];

export default function AnalyticsPage() {
  const navigate = useNavigate();
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">

         {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">Sales Analytics</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="back-button"
        >
          ← Back to Dashboard
        </button>
      </div>
      <div className="bg-white shadow-xl rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📆 Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#6366f1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Yearly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
            <div className="bg-white p-10 rounded shadow-md">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600 mb-6">Welcome to your dashboard!</p>
                <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

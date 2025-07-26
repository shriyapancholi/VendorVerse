// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ⬅️ import this

// const cities = ["Surat", "Ahmedabad", "Rajkot", "Vadodara", "Gandhinagar"];

// export default function SupplierHeader() {
//     const navigate = useNavigate();
//     const [selectedCity, setSelectedCity] = useState("Select Location");
//     const [showDropdown, setShowDropdown] = useState(false);

//       const handleLogout = () => {
//     // 🔐 Clear any login/session data
//     localStorage.clear(); // or localStorage.removeItem("token") if using a key
//     sessionStorage.clear();

//     // 🔁 Redirect to login page
//     navigate("/login"); // change to your login route
//   };

//     return (
//         <header className="vendor-header">
//   <div className="top-bar">
//     {/* Left Section */}
//     <div className="left-section">
//       <h1 className="logo">VendorVerse Supplier</h1>
//       <div className="location-selector" onClick={() => setShowDropdown(!showDropdown)}>
//         <span>{selectedCity}</span>
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
//         {showDropdown && (
//           <ul className="dropdown">
//             {cities.map((city) => (
//               <li key={city} onClick={() => { setSelectedCity(city); setShowDropdown(false); }}>
//                 {city}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>

//     {/* Center Section */}
//     <div className="center-section">
//       <div className="search-bar">
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
//         <input type="text" placeholder="Search inventory..." />
//       </div>
//     </div>

//     {/* Right Section */}
//     <div className="right-section">
//       <div className="user-action" onClick={handleLogout}>
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//         <span>Logout</span>
//       </div>
//     </div>
//   </div>
// </header>

//     );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cities = ["Surat", "Ahmedabad", "Rajkot", "Vadodara", "Gandhinagar"];

export default function SupplierHeader() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Select Location");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white py-4 px-6 shadow-sm rounded-b-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Logo + Location */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-indigo-600">VendorVerse Supplier</h1>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-gray-100 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
  <path fillRule="evenodd" d="M5.05 3.05a7 7 0 119.9 9.9L10 18l-4.95-5.05a7 7 0 010-9.9zM10 11a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
</svg>

              {selectedCity}
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                {cities.map((city) => (
                  <li
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-1/3 shadow-sm">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search inventory..."
            className="ml-2 w-full bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div>

        {/* Right: Logout */}
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-md cursor-pointer transition-all"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-gray-700 font-medium">Logout</span>
        </div>
      </div>
    </header>
  );
}

import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import CreditBox from "./CreditBox";

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);



  return (
    <>
      <div className="dashboard flex flex-col md:flex-row min-h-screen">
        <div className="top-navbar bg-gray-800 text-white flex items-center justify-between p-4">
          <div className="relative">
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded shadow-lg">
                <ul className="p-2">
                  
                  <li className="hover:bg-gray-100 p-2">
                    <Link to="/profile">View Profile</Link>
                  </li>
                  <li className="hover:bg-gray-100 p-2">
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="hover:bg-gray-100 p-2 border-t">
                    <button onClick={() => {/* handle logout */}}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="side-navbar bg-gray-800 text-white p-4 md:w-1/4">
          <ul className="space-y-4">
            <li>
              <Link to="img-gen" className="block py-2 px-4 rounded hover:bg-gray-700">Image Tool</Link>
            </li>
            <li>
              <Link to="text-gen" className="block py-2 px-4 rounded hover:bg-gray-700">Text Tool</Link>
            </li>
            <li></li>
            <li className="bg-gray-700 rounded">
              <CreditBox />
            </li>
          </ul>
        </div>
        <div className="main-container flex-1 p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
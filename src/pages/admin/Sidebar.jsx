import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      className={`bg-white h-screen w-64 shadow-md transform transition-all`}
    >
      <div className="flex items-center p-4">
        <span className="font-bold text-lg text-gray-700">Wadol</span>
      </div>

      <hr className="border-gray-300" />

      <div className="mt-4">
        <ul className="space-y-2">
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md">
            <Link to="/admin/dashboard" className="block text-gray-700 font-medium">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

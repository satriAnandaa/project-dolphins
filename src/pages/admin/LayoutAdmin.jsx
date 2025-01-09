import React, { useState, useEffect, useContext} from 'react';
import { LogOut, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LayoutAdmin = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('');
  const { logout } = useContext(AuthContext);

  // Update activePage based on the current path
  useEffect(() => {
    const currentPath = location.pathname;
    const pageMap = {
      '/dashboard': 'Dashboard',
      '/tour-package': 'Tour Packages',
      '/manage-other': 'Manage Other',
    };
    setActivePage(pageMap[currentPath] || '');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full transition-transform duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="w-64 h-full bg-gradient-to-b from-black to-blue-500 text-white p-6 shadow-xl">
            <div className="text-2xl font-bold mb-10">Wadol Admin</div>
            <nav className="space-y-3">
              {[{
                name: 'Dashboard',
                path: '/dashboard',
              }, {
                name: 'Tour Packages',
                path: '/tour-package',
              }, {
                name: 'Manage Other',
                path: '/manage-other',
              }].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block p-4 rounded-lg cursor-pointer transition-all font-medium ${
                    activePage === item.name
                      ? 'bg-blue-600 shadow-lg'
                      : 'hover:bg-blue-700/50'
                  }`}
                  onClick={() => setActivePage(item.name)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Top Bar */}
          <div className="sticky top-0 z-40 bg-white shadow-sm">
            <div className="flex justify-between items-center px-8 py-4">
              <div className="flex items-center gap-4">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">{activePage}</h1>
              </div>

              {/* Profile Section */}
              <div className="relative">
                <button
                  className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <img
                    src="/api/placeholder/40/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                  <span className="font-medium text-gray-700">Admin</span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden">
                    <div className="py-2">
                      <div
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                        onClick={() => navigate('/profile')}
                      >
                        <span className="text-gray-700">Profile</span>
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-2 text-red-600"
                        onClick={() => logout()}
                      >
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;

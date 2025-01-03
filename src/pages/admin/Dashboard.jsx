import React, { useState } from 'react';
import { Menu, Plus, Pencil, Trash2, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([
    {
      id: '1',
      package_name: 'Dolphin Watching Adventure',
      description: 'Experience the magic of dolphins in their natural habitat',
      price: 99.99,
      seat_available: 20,
      image: '/api/placeholder/100/100'
    },
    {
      id: '2',
      package_name: 'Sunset Dolphin Tour',
      description: 'Watch dolphins play during a beautiful sunset',
      price: 149.99,
      seat_available: 15,
      image: '/api/placeholder/100/100'
    }
  ]);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('Tour Packages');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    package_name: '',
    description: '',
    price: '',
    seat_available: '',
    image: null
  });

  // Rest of the handlers remain the same
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({...prev, image: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPackage) {
      setPackages(packages.map(pkg => 
        pkg.id === editingPackage.id ? { ...formData, id: pkg.id } : pkg
      ));
    } else {
      setPackages([...packages, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const resetForm = () => {
    setFormData({
      package_name: '',
      description: '',
      price: '',
      seat_available: '',
      image: null
    });
    setEditingPackage(null);
    setIsDialogOpen(false);
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Improved Sidebar */}
        <div className={`fixed top-0 left-0 h-full transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="w-64 h-full bg-gradient-to-b from-black to-blue-500 text-white p-6 shadow-xl">
            <div className="text-2xl font-bold mb-10">Wadol Admin</div>
            <nav className="space-y-3">
              {['Dashboard', 'Tour Packages', 'Settings'].map((item) => (
                <div
                  key={item}
                  className={`p-4 rounded-lg cursor-pointer transition-all font-medium ${
                    activePage === item 
                      ? 'bg-blue-600 shadow-lg' 
                      : 'hover:bg-blue-700/50'
                  }`}
                  onClick={() => setActivePage(item)}
                >
                  {item}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
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

              {/* Profile Section - Fixed Position */}
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
                        onClick={() => navigate('/login')}
                      >
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar - Below Top Bar */}
            {activePage === 'Tour Packages' && (
              <div className="px-8 py-4 bg-white border-t">
                <div className="max-w-2xl relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="p-8">
            {activePage === 'Tour Packages' && (
              <div className="mb-6 flex justify-end">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="h-5 w-5" />
                  Add Package
                </button>
              </div>
            )}

            {/* Packages Table */}
            {activePage === 'Tour Packages' && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Package Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Available Seats</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPackages.map((pkg) => (
                        <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <img
                              src={pkg.image}
                              alt={pkg.package_name}
                              className="w-16 h-16 rounded-lg object-cover border"
                            />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{pkg.package_name}</td>
                          <td className="px-6 py-4 text-gray-600">{pkg.description}</td>
                          <td className="px-6 py-4 text-gray-900">${pkg.price}</td>
                          <td className="px-6 py-4 text-gray-600">{pkg.seat_available}</td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(pkg)}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                              >
                                <Pencil className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(pkg.id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal remains the same */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[500px] shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Package Name"
                name="package_name"
                value={formData.package_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Available Seats"
                  name="seat_available"
                  value={formData.seat_available}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {editingPackage ? 'Update Package' : 'Add Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
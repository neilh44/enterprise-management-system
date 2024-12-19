// frontend/src/components/common/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Settings 
} from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/hr', icon: Users, label: 'HR' },
    { path: '/sales', icon: ShoppingCart, label: 'Sales' },
    { path: '/marketing', icon: TrendingUp, label: 'Marketing' },
    { path: '/inventory', icon: Package, label: 'Inventory' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Enterprise System</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
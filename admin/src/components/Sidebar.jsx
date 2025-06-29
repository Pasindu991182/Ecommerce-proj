import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const navItems = [
    { to: '/add', icon: assets.add_icon, label: 'Add Items' },
    { to: '/list', icon: assets.order_icon, label: 'List Items' },
    { to: '/orders', icon: assets.order_icon, label: 'Orders' },
  ];

  return (
    <div className="w-64 min-h-screen bg-blue-50 shadow-lg border-r border-gray-200 p-6">
      {/* Logo or Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold text-blue-800 mt-2">Admin Panel</h2>
      </div>

      {/* Navigation Links */}
      <div className="space-y-3">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 font-medium
              ${
                isActive
                  ? 'bg-white text-pink-800 border border-pink-300'
                  : 'text-gray-700 hover:bg-pink-100 hover:text-pink-800 border border-transparent'
              }`
            }
          >
            <img className="w-5 h-5" src={item.icon} alt={item.label} />
            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

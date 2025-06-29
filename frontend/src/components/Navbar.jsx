import React, { useState, useRef, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../contex/ShopContext';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { token, setToken, setShowSearch, getCartCount, setCartItems } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setShowDropdown(false);
  }, [location.pathname]);

  return (
    <div className='relative z-50'>
      <div className='bg-[#e0f2fe] text-sky-900 shadow-md border-b border-sky-300 px-8 py-6 flex items-center justify-between'>


        <Link to='/'>
          <img
          src={assets.logo}
          className='w-59 h-auto max-h-16 cursor-pointer hover:opacity-90 transition-opacity'
          alt="Logo"
/>

        </Link>

        <ul className='flex gap-7 text-[15px] font-semibold items-center'>
          {[
            { name: 'HOME', to: '/' },
            { name: 'COLLECTION', to: '/collection' },
            { name: 'ABOUT', to: '/about' },
            { name: 'CONTACT', to: '/contact' }
          ].map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `relative transition-all duration-300 px-4 py-2.5 rounded-lg tracking-wide
                ${isActive
                    ? 'text-white bg-sky-500 shadow-md font-bold'
                    : 'text-sky-700 hover:text-sky-900 hover:bg-white/60 hover:shadow-sm'}
                before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:bg-sky-400 before:transition-all before:duration-300
                ${isActive ? 'before:w-0' : 'before:w-0 hover:before:w-6 before:-translate-x-1/2'}`}
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        <div className='flex items-center gap-6'>
          <div className='p-2.5 rounded-full hover:bg-white/70 hover:shadow-sm transition-all cursor-pointer group'>
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity filter'
              style={{ filter: 'invert(0.3) sepia(1) saturate(3) hue-rotate(180deg)' }}
              alt="Search"
            />
          </div>

          {/* Profile dropdown */}
          <div className='relative' ref={dropdownRef}>
            <div
              className='p-1.5 rounded-full hover:bg-white/70 hover:shadow-sm transition-all cursor-pointer'
              onClick={() => setShowDropdown(prev => !prev)}
            >
              <img
                className='w-7 h-7 rounded-full border-2 border-sky-300 hover:border-sky-400 transition-colors shadow-sm cursor-pointer'
                src={assets.profile_icon}
                alt='Profile'
              />
            </div>

            <div className={`absolute right-0 mt-3 bg-white/95 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-xl transition-all duration-200 w-50 z-20 overflow-hidden
              ${showDropdown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              <div className='py-2'>
                {token ? (
                  <>
                    <button
                      className='w-full px-5 py-3 text-left text-sm text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors flex items-center gap-3'
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/profile');
                      }}
                    >
                      <span className='text-sky-400'>👤</span>
                      My Profile
                    </button>
                    <button
                      className='w-full px-5 py-3 text-left text-sm text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors flex items-center gap-3'
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/orders');
                      }}
                    >
                      <span className='text-sky-400'>📦</span>
                      Orders
                    </button>
                    <hr className='border-sky-100 my-1' />
                    <button
                      className='w-full px-5 py-3 text-left text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3'
                      onClick={() => {
                        setShowDropdown(false);
                        setToken(null);
                        setCartItems({});               // Reset cart on logout
                        localStorage.removeItem('token');
                        localStorage.removeItem('cartItems'); // Clear cart in localStorage too
                        navigate('/login');
                      }}
                    >
                      <span className='text-red-400'>🚪</span>
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className='w-full px-5 py-3 text-left text-sm text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors flex items-center gap-3'
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/login');
                    }}
                  >
                    <span className='text-sky-400'>🔐</span>
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>

          <Link to='/cart' className='relative p-2.5 rounded-full hover:bg-white/70 hover:shadow-sm transition-all group'>
            <img
              src={assets.cart_icon}
              className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity filter'
              style={{ filter: 'invert(0.3) sepia(1) saturate(3) hue-rotate(180deg)' }}
              alt='Cart'
            />
            <span className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-sky-400 to-sky-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white'>
              {getCartCount()}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState, useRef, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../contex/ShopContext';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setShowDropdown(false);
    setMobileMenuOpen(false); // close mobile nav on route change
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', to: '/' },
    { name: 'COLLECTION', to: '/collection' },
    { name: 'ABOUT', to: '/about' },
    { name: 'CONTACT', to: '/contact' },
  ];

  return (
    <div className='relative z-50'>
      <div className='bg-[#e0f2fe] text-sky-900 shadow-md border-b border-sky-300 px-5 sm:px-8 py-5 flex items-center justify-between'>

        {/* Logo */}
        <Link to='/'>
          <img
            src={assets.logo}
            className='w-auto h-12 cursor-pointer hover:opacity-90 transition-opacity'
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex gap-7 text-sm font-semibold items-center'>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2.5 rounded-lg tracking-wide transition-all duration-300
                ${isActive
                  ? 'text-white bg-sky-500 shadow-md font-bold'
                  : 'text-sky-700 hover:text-sky-900 hover:bg-white/60 hover:shadow-sm'}
                before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:bg-sky-400 before:transition-all before:duration-300
                ${isActive ? 'before:w-0' : 'before:w-0 hover:before:w-6 before:-translate-x-1/2'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button className="md:hidden flex items-center" onClick={() => setMobileMenuOpen(prev => !prev)}>
          <img src={assets.menu_icon} alt="Menu" className='w-6 h-6' />
        </button>

        {/* Right icons */}
        <div className='flex items-center gap-5'>
          {/* Search */}
          <div className='p-2 rounded-full hover:bg-white/70 hover:shadow-sm transition-all cursor-pointer group'>
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity'
              style={{ filter: 'invert(0.3) sepia(1) saturate(3) hue-rotate(180deg)' }}
              alt="Search"
            />
          </div>

          {/* Profile */}
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

            {/* Dropdown */}
            <div className={`absolute right-0 mt-3 bg-white/95 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-xl transition-all duration-200 w-52 z-20 overflow-hidden
              ${showDropdown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              <div className='py-2'>
                {token ? (
                  <>
                    <button onClick={() => { navigate('/profile'); setShowDropdown(false); }} className='dropdown-item'>👤 My Profile</button>
                    <button onClick={() => { navigate('/orders'); setShowDropdown(false); }} className='dropdown-item'>📦 Orders</button>
                    <hr className='border-sky-100 my-1' />
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        setToken(null);
                        setCartItems({});
                        localStorage.removeItem('token');
                        localStorage.removeItem('cartItems');
                        navigate('/login');
                      }}
                      className='dropdown-item text-red-500 hover:text-red-600 hover:bg-red-50'
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <button onClick={() => { navigate('/login'); setShowDropdown(false); }} className='dropdown-item'>🔐 Login / Register</button>
                )}
              </div>
            </div>
          </div>

          {/* Cart */}
          <Link to='/cart' className='relative p-2 rounded-full hover:bg-white/70 hover:shadow-sm transition-all group'>
            <img
              src={assets.cart_icon}
              className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity'
              style={{ filter: 'invert(0.3) sepia(1) saturate(3) hue-rotate(180deg)' }}
              alt='Cart'
            />
            <span className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-sky-400 to-sky-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white'>
              {getCartCount()}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-white border-t border-sky-200 shadow-md px-5 py-4 flex flex-col gap-4 text-sm'>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `py-2 px-2 rounded-md font-semibold transition-colors
                ${isActive ? 'text-white bg-sky-500' : 'text-sky-700 hover:bg-sky-100'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

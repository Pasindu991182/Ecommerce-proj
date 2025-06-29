import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#eaf4fb] via-[#f6fbff] to-white text-blue-900 py-10 px-5 sm:px-10 rounded-t-3xl shadow-inner">

      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-3">

        {/* 🔷 Logo & Description */}
        <div>
          <img src={assets.logo} alt="Logo" className="mb-4 w-32" />
          <p className="text-sm leading-relaxed text-blue-800">
            Discover the finest destinations with us. We provide reliable travel services and unforgettable experiences for adventurers around the world.
          </p>
        </div>

        {/* 🔷 Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Company</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {['Home', 'About Us', 'Delivery', 'Privacy Policy'].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔷 Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Contact Us</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>Email: pasindughp@gmail.com</li>
            <li>Phone: 0719366028</li>
            <li>Location: No 82,kumarathunga road , matara</li>
          </ul>
        </div>
      </div>

      {/* 🔷 Footer Bottom */}
      <div className="mt-10 border-t pt-5 text-center text-xs text-blue-600">
        &copy; {new Date().getFullYear()} IROSHAN IT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="https://via.placeholder.com/50" alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-red-400">Company Name</span>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-900 hover:text-white">Home</a>
            <a href="#" className="text-gray-900 hover:text-white">About</a>
            <a href="#" className="text-gray-900 hover:text-white">Services</a>
            <a href="#" className="text-gray-900 hover:text-white">Contact</a>
          </nav>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">&copy; 2024 Company Name. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

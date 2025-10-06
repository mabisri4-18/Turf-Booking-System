import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & description */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2">Turf Booking App</h2>
          <p className="text-gray-400 text-sm">
            Book your favorite sports facility anytime, anywhere. Fast, easy, and secure.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link to="/about" className="text-gray-400 hover:text-white mb-1 transition-colors">About Us</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white mb-1 transition-colors">Contact</Link>
          <Link to="/privacy" className="text-gray-400 hover:text-white mb-1 transition-colors">Privacy Policy</Link>
        </div>

{/* Contact Info */}
<div className="flex flex-col">
<h3 className="text-lg font-semibold mb-2">Contact</h3>
<p className="text-gray-400 mb-1">Email: support@turfapp.com</p>
<p className="text-gray-400 mb-1">Phone: +91 12345 67890</p>
<p className="text-gray-400">Address: 123 Turf Street, City, Country</p>
</div>
</div>

<div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
&copy; 2025 Turf Booking App. All rights reserved.
</div>
</footer>
);
};

export default Footer;
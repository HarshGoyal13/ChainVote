import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10">
      <div className="container mx-auto text-center px-4">
        {/* Brand Name */}
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Voting System
        </h2>

        {/* Copyright Section */}
        <p className="text-sm text-gray-400 mb-6">
          &copy; {new Date().getFullYear()} Voting System. All rights reserved.
        </p>

        {/* Divider */}
        <div className="w-2/3 mx-auto h-0.5 bg-gray-700 my-6 rounded-full"></div>

        {/* Social Links Section */}
        <div className="flex justify-center items-center space-x-8 mb-6">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition duration-300 transform hover:scale-125"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500 transition duration-300 transform hover:scale-125"
            aria-label="GitHub"
          >
            <FaGithub size={32} />
          </a>
        </div>

        {/* Optional Message Section */}
        <p className="mt-6 text-gray-500 text-sm">
          &bull; Built with ❤️ and dedication for a seamless experience.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

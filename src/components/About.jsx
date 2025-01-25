import React from 'react';
import { FaLock, FaUsers, FaCogs } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="py-20 bg-gradient-to-r from-[#0c1726] to-[#1A365D] text-center">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-extrabold text-white mb-6 animate-fadeIn">
          About Us
        </h2>
        <p className="text-[#E2E8F0] text-lg max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeInDelay">
          We are a pioneering team dedicated to innovating and providing a secure and transparent electronic voting experience. Our mission is to revolutionize democratic processes by empowering citizens through technology, ensuring that every vote counts and is protected. Using tokens, we enable secure voting and offer the ability to buy or sell tokens for voting power.
        </p>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Security First */}
          <div className="flex flex-col items-center bg-gradient-to-r from-[#2D3748] to-[#4A5568] p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-[#FFD700] to-[#F6E05E] p-6 rounded-full mb-6 shadow-lg">
              <FaLock className="text-4xl text-[#2D3748]" />
            </div>
            <h3 className="text-xl text-white font-semibold mb-3">Security First</h3>
            <p className="text-[#E2E8F0] text-center">
              Our platform ensures secure voting with blockchain-backed technology, using encrypted tokens to guarantee that every vote is tamper-proof, confidential, and verifiable.
            </p>
          </div>

          {/* Citizen Empowerment */}
          <div className="flex flex-col items-center bg-gradient-to-r from-[#2D3748] to-[#4A5568] p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-[#FFD700] to-[#F6E05E] p-6 rounded-full mb-6 shadow-lg">
              <FaUsers className="text-4xl text-[#2D3748]" />
            </div>
            <h3 className="text-xl text-white font-semibold mb-3">Citizen Empowerment</h3>
            <p className="text-[#E2E8F0] text-center">
              We empower citizens by giving them control over their votes through tokenized voting. Buy or sell tokens to influence the democratic process while ensuring fairness and transparency.
            </p>
          </div>

          {/* Innovative Technology */}
          <div className="flex flex-col items-center bg-gradient-to-r from-[#2D3748] to-[#4A5568] p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-[#FFD700] to-[#F6E05E] p-6 rounded-full mb-6 shadow-lg">
              <FaCogs className="text-4xl text-[#2D3748]" />
            </div>
            <h3 className="text-xl text-white font-semibold mb-3">Innovative Technology</h3>
            <p className="text-[#E2E8F0] text-center">
              We leverage the latest blockchain technology to create a seamless voting experience, offering voters the ability to buy, sell, and stake tokens for greater influence in the voting process.
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to={"/contactus"}
            className="px-8 py-4 bg-gradient-to-r from-[#3182CE] to-[#63B3ED] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;

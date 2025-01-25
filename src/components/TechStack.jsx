import React,{useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faNodeJs, faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import {Web3Context} from "../context/Web3Context"

function TechStack() {

  const {handelWallet} = useContext(Web3Context)

  return (
    <div className="py-20 bg-[#F7FAFC]">
      <div className="mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold text-green-500 mb-8 text-shadow-md">
          Our Technology Stack
        </h2>
        <p className="text-[#2D3748] text-lg font-bold max-w-3xl mx-auto mb-12 leading-relaxed">
          Core technologies that power our platform.
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10">

          <div className="tech-card bg-[#61DAFB] text-white py-12 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <FontAwesomeIcon icon={faReact} className="text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Frontend</h3>
            <p className="text-[#1A202C] text-base">React</p>
            <p className="text-[#1A202C] text-base">Tailwind CSS</p>
          </div>

   
          <div className="tech-card bg-[#4DB33D] text-white py-12 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <FontAwesomeIcon icon={faNodeJs} className="text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Backend</h3>
            <p className="text-[#1A202C] text-base">Node.js</p>
            <p className="text-[#1A202C] text-base">Express.js</p>
          </div>

     
          <div className="tech-card bg-[#FF9900] text-white py-12 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <FontAwesomeIcon icon={faDatabase} className="text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Storage</h3>
            <p className="text-[#1A202C] text-base">MongoDB</p>
            <p className="text-[#1A202C] text-base">IPFS</p>
          </div>

          <div className="tech-card bg-[#F2A900] text-white py-12 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <FontAwesomeIcon icon={faBitcoin} className="text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Contract</h3>
            <p className="text-[#1A202C] text-base">Solidity</p>
            <p className="text-[#1A202C] text-base">Deployed on Ethereum Blockchain</p>
          </div>
        </div>

        <div className="mt-14">
          <button
          onClick={()=> handelWallet()}
            className="relative group px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-lg overflow-hidden"
          >
            <span className="absolute inset-0 border-[3px] border-transparent rounded-md bg-gradient-to-r from-green-500 via-cyan-500 to-teal-500 bg-[length:200%_200%] animate-border-loop"></span>
            <span className="relative z-10">Launch Dapp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TechStack;

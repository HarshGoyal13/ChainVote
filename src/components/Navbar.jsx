import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../context/Web3Context"; 
import logo from "../assets/vote.png";

const Navigation = () => {
  const { handelWallet, selectedAccount } = useContext(Web3Context);
  console.log(selectedAccount);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedAccount && window.location.pathname === '/') {
      navigate('/Register-voter');
    }
  }, [selectedAccount]);

  return (
    <main>
      <nav className="flex justify-between items-center px-6 lg:px-12 py-6 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg z-50 relative font-sans">
        <div className="flex items-center gap-4 lg:gap-8">
          <Link to="/" aria-label="Voting System Home">
            <img
              src={logo} 
              alt="Voting System Logo"
              className="h-10 lg:h-12 object-contain hover:opacity-90 transition duration-300"
            />
          </Link>
        </div>

        <div className="hidden lg:flex flex-grow items-center justify-center">
          <div className="flex-grow flex items-center justify-center gap-8 text-white font-medium">
            {selectedAccount ? (
              <>
                <Link
                  to="/register-voter"
                  className="hover:text-green-500 transition duration-300 ease-in-out transform hover:scale-105"
                  aria-label="Register Voter"
                >
                  Register Voter
                </Link>
                <Link
                  to="/register-candidate"
                  className="hover:text-green-500 transition duration-300 ease-in-out transform hover:scale-105"
                  aria-label="Register Candidate"
                >
                  Register Candidate
                </Link>

                <Link
                  to="/election-commision"
                  className="hover:text-green-500 transition duration-300 ease-in-out transform hover:scale-105"
                  aria-label="Election Commission"
                >
                  Election Commission
                </Link>
                <Link
                  to="/token-marketplace"
                  className="hover:text-green-500 transition duration-300 ease-in-out transform hover:scale-105"
                  aria-label="Token Marketplace"
                >
                  Token Marketplace
                </Link>
              </>
            ) : (
              <div className="ml-auto">
                <button
                  onClick={() => handelWallet()}
                  className="bg-gradient-to-r from-green-500 to-green-800 text-white px-6 py-2 rounded-xl shadow-lg hover:from-green-700 hover:to-green-800 transition duration-300 ease-in-out transform hover:scale-105"
                  aria-label="Connect Wallet"
                >
                  {selectedAccount ? "DO VOTE" : "Connect Wallet"}
                </button>
              </div>
            )}
          </div>
        </div>


        {selectedAccount && (
          <div className="ml-auto">
            <Link
              to="/CastVote"
              className="text-green-500 border-2 border-green-500 px-6 py-2 rounded-xl shadow-lg hover:text-white hover:border-green-700 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Cast Vote"
            >
              CAST VOTE
            </Link>
          </div>
        )}


      </nav>
    </main>
  );
};

export default Navigation;

import { ethers } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Selltoken from './Selltoken';
import { HashLoader } from "react-spinners";
import Loader from "../Loader"

const BuySellToken = ({ erc20ContractInstance, tokenMarketPlaceInstance }) => {
  const tokenAmountRef = useRef(null);
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(null);

  const [shouldUpdatePrice, setShouldUpdatePrice] = useState(false);
  
  const buyToken = async (e) => {
    try {
      e.preventDefault();
      const tokenAmount = tokenAmountRef.current.value;
  
      if (!tokenMarketPlaceInstance) {
        toast.error("Contract instance is not available");
        return;
      }
      setLoading(true);
      setMessage("Wait For Confirm Transaction..")
      const tokenAmountInWei = ethers.parseEther(tokenAmount);
      const requiredTokenPrice = await tokenMarketPlaceInstance.calculateTokenPrice(tokenAmountInWei);
  
      const priceToPay = ethers.formatEther(requiredTokenPrice);
  
      if (isNaN(priceToPay) || priceToPay <= 0) {
        toast.error("Invalid token price");
        return;
      }
  
      const tx = await tokenMarketPlaceInstance.buyGLDToken(tokenAmountInWei, {
        value: ethers.parseEther(priceToPay.toString()),
      });
  
      await tx.wait();
      setLoading(false);
      setMessage("")
      toast.success("Token purchased successfully!");

  
      // Trigger price update
      setShouldUpdatePrice(true);
    } catch (error) {
      console.error("Error buying token:", error);
      toast.error("Failed to buy token");
    }
  };
  

  useEffect(() => {
    const updatePrice = async () => {
      if (!tokenMarketPlaceInstance) return;
  
      try {
        const tx = await tokenMarketPlaceInstance.updatePrice();
        await tx.wait();
        toast.success("Price updated successfully");
      } catch (error) {
        console.error("Failed to update price:", error);
        toast.error("Failed to update price");
      }
    };
  
    if (shouldUpdatePrice) {
      updatePrice();
      setShouldUpdatePrice(false); // Reset the flag after updating price
    }
  }, [shouldUpdatePrice]);
  
  
  
  return (
<div className="flex flex-col justify-center items-center space-y-10 mt-10 px-4">
  <h1 className="text-white text-2xl font-bold mb-6">Token Transactions</h1>

  <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full max-w-4xl">
    {/* Buy Token Form */}
    <form
      onSubmit={buyToken}
      className="bg-gray-800 p-6 rounded-lg shadow-lg lg:mb-[350px] w-full lg:max-w-md mt-8"
    >
      <h2 className="text-white text-xl font-semibold mb-4">Buy Tokens</h2>
      <label className="block text-white text-lg font-medium mb-2">
        Token Amount to Buy (in ETH):
      </label>
      <input
        type="text"
        ref={tokenAmountRef}
        className="w-full bg-gray-700 text-white text-base p-3 rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter amount"
        disabled={loading} // Disable input during loading
      />
      <button
        type="submit"
        className={`w-full flex items-center justify-center ${
          loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
        } text-white font-semibold py-3 rounded-lg shadow-md transition duration-300`}
        disabled={loading} // Disable button during loading
      >
        {loading ? <HashLoader size={25} color="#fff"/> : "Buy Token"}
      </button>
    </form>

    {/* Sell Token Form */}
    <div className=" lg:w-[600px]">
      <Selltoken
        erc20ContractInstance={erc20ContractInstance}
        tokenMarketPlaceInstance={tokenMarketPlaceInstance}
      />
    </div>
  </div>
</div>



  );
};

export default BuySellToken;

import { ethers } from 'ethers'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { HashLoader } from "react-spinners";
import Loader from "../Loader"

const Selltoken = ({erc20ContractInstance, tokenMarketPlaceInstance}) => {

    const sellTokenAmountRef = useRef()
    const approveTokenRef = useRef()
    const [loading, setLoading] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [message,setMessage] = useState(null);

    const [sellSuccess, setSellSuccess] = useState(false);

    const sellToken = async (e) => {
        try {
          e.preventDefault();
          setLoading(true);
          setMessage("Wait for Confirm Transaction..")
      
          const tokenValueEth = sellTokenAmountRef.current.value;
      
          if (!tokenMarketPlaceInstance) {
            toast.error("Contract instance not available");
            return;
          } 
      
          const tokenValueInWei = ethers.parseEther(tokenValueEth);
          console.log("Token Value in Wei:", tokenValueInWei.toString());
      
          // Call the smart contract method to sell tokens
          const tx = await tokenMarketPlaceInstance.sellGLDToken(tokenValueInWei);
          const receipt = await tx.wait();
      
          if (receipt.status === 0) {
            throw new Error("Transaction reverted");
          }
      
          console.log("Transaction Successful:", receipt);
          toast.success("Tokens sold successfully!");
          setLoading(false);
          setMessage("")
      
          setSellSuccess(true); // Trigger useEffect for updating price
        } catch (error) {
          console.error("Error selling tokens:", error);
          toast.error("Failed to sell tokens");
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        const updatePrice = async () => {
          if (!tokenMarketPlaceInstance) {
            console.warn("Contract instance not available for updating price");
            return;
          }
      
          try {
            const tx = await tokenMarketPlaceInstance.updatePrice();
            const receipt = await tx.wait();
      
            if (receipt.status === 0) {
              throw new Error("Update price transaction reverted");
            }
      
            console.log("Token price updated successfully:", receipt);
            toast.success("Token price updated successfully!");
          } catch (error) {
            console.error("Failed to update token price:", error);
            toast.error("Failed to update token price");
          } finally {
            setSellSuccess(false); // Reset sellSuccess after updating price
          }
        };
      
        if (sellSuccess) {
          updatePrice();
        }
      }, [sellSuccess]);

    const approveToken = async (e)=>{
        try{
            e.preventDefault();
            setApproveLoading(true)
            setMessage("Wait for Approve")
            const tokenValueEth = approveTokenRef.current.value;
            const tokenValueInWei = ethers.parseEther(tokenValueEth,18);
            const tokenMarketPlace = "0xB032F754f90A9d69F8042F5DEf58B0a42c654072";
            const tx = await erc20ContractInstance.approve(tokenMarketPlace, tokenValueInWei);
            const recipet = tx.wait;
            console.log("Approve Token Successfully,", recipet);
            setApproveLoading(false);
            setMessage("")
            toast.success("Approve Token Successfully");
        }catch(error){
          setApproveLoading(false);
            toast.error("ERROR:Approving Token")
            console.log(error);
        }
    }


  return (
<div className="flex flex-col items-center space-y-8  bg-gray-800 p-6 rounded-lg ">

    {loading  && <Loader message={message}/>}
    {approveLoading  && <Loader message={message}/>}

  {/* Sell Token Form */}
  <div className=" p-6 rounded-lg  w-full max-w-lg">
    <h2 className="text-white text-xl font-semibold mb-4">Sell Tokens</h2>
    <form onSubmit={sellToken} className="space-y-4">
      <label className="block text-white text-lg font-medium">
        Token Amount to Sell (in ETH):
      </label>
      <input
        type="text"
        ref={sellTokenAmountRef}
        className="w-full bg-gray-700 text-white text-base p-3 rounded-lg mb-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter amount"
        disabled={loading}
      />
      <button
        type="submit"
        className={`w-full flex items-center justify-center ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"} text-white font-semibold py-3 rounded-lg shadow-md transition duration-300`}
        disabled={loading}
      >
        {loading ? <HashLoader size={25} color="#fff"/> : "Sell Token"}
      </button>
    </form>
  </div>

  {/* Approve Token Form */}
  <div className=" p-6 rounded-lg w-full max-w-lg">
    <h2 className="text-white text-xl font-semibold mb-4">Approve Tokens</h2>
    <form onSubmit={approveToken} className="space-y-4">
      <label className="block text-white text-lg font-medium">
        Token Amount to Approve (in ETH):
      </label>
      <input
        type="text"
        ref={approveTokenRef}
        className="w-full bg-gray-700 text-white text-base p-3 rounded-lg mb-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter amount"
        disabled={approveLoading}
      />
      <button
        type="submit"
        className={`w-full flex items-center justify-center ${approveLoading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"} text-white font-semibold py-3 rounded-lg shadow-md transition duration-300`}
        disabled={approveLoading}
      >
        {approveLoading ? <HashLoader size={25} color="#fff"/> : "Approve Token" }
      </button>
    </form>
  </div>
</div>

  )
}

export default Selltoken
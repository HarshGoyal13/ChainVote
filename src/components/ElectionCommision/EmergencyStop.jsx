
import React, { useState, useContext } from 'react';
import { Web3Context } from "../../context/Web3Context";
import toast from 'react-hot-toast';
import Loader from "../Loader"

const EmergencyStop = () => {
  const { contractInstance } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const emergencyStop = async () => {
    if (loading) return; // Prevent multiple clicks

    
    try {
       setLoading(true);
       setMessage("Wait for Stop Voting..")
      await contractInstance.emergencyStopVoting();
      setLoading(false);
      setMessage("")
      toast.success("Emergency Stop activated successfully!");
    } catch (error) {
      toast.error("Error: Emergency Stop");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-[30px]">
        {loading && <Loader message={message}/>}
    <button
      onClick={emergencyStop}
      disabled={loading}
      className="w-[300px] text-lg font-semibold text-yellow-400 bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 
      border-2 border-yellow-800 rounded-lg py-3 px-6 
      transform transition duration-300 ease-in-out hover:text-yellow-800 hover:border-yellow-800 hover:shadow-lg hover:scale-105 
      focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      {loading ? 'Processing...' : 'Emergency Stop'}
    </button>
  </div>
  );
};

export default EmergencyStop;
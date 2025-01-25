


import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';
import toast from 'react-hot-toast';
import Loader from "../Loader"

const VotingStatus = () => {
  const { contractInstance } = useContext(Web3Context);
  const [votingStatus, setVotingStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  const statusMap = {
    0: 'Not Started',
    1: 'In Progress',
    2: 'Ended',
  };

  useEffect(() => {
    const getVotingStatus = async () => {
      if (!contractInstance) {
        setVotingStatus('Contract instance not available');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setMessage("Fetching Voting Status..");
        const currentVotingStatus = await contractInstance.getVotingStatus();
        setVotingStatus(statusMap[currentVotingStatus] || 'Unknown Status');
        setLoading(false);
        setMessage("");
      } catch (error) {
        console.error('Error fetching voting status:', error);
        toast.error('Error: Getting Voting Status');
        setVotingStatus('Error fetching status');
      } finally {
        setLoading(false);
      }
    };

    getVotingStatus();
  }, [contractInstance]);

  console.log(votingStatus);

  return (

      <div className="text-center">
        {loading && <Loader message={message}/>}
            <div className="top-0 left-0 w-full bg-gradient-to-r from-green-500 to-green-800 text-white text-lg font-medium py-4 px-6 shadow-lg z-50 flex justify-between items-center">
            <span className="text-2xl font-bold">Voting Status :</span> 
            <span className="text-2xl font-bold animate-pulse">{votingStatus}..</span>
          </div>
       
      </div>

  );
};

export default VotingStatus;
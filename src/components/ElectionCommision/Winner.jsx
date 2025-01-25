


import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from '../../context/Web3Context';
import toast from 'react-hot-toast';

const Winner = () => {
  const { contractInstance } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState('No winner declared');

  const announceWinner = async () => {
    if (!contractInstance) {
      toast.error('Contract instance not available');
      return;
    }

    setLoading(true);
    try {
      const tx = await contractInstance.announceVotingResult();
      const receipt = await tx.wait();
      toast.success('Winner announced successfully!');
      console.log('Transaction receipt:', receipt);
    } catch (error) {
      toast.error('Error: Announcing result');
      console.error('Error announcing result:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getWinner = async () => {
      if (!contractInstance) {
        console.error('Contract instance not available');
        setWinner('Error: Unable to fetch winner');
        setLoading(false);
        return;
      }

      try {
        const winningCandidateAddress = await contractInstance.winner();
        if (winningCandidateAddress !== '0x0000000000000000000000000000000000000000') {
          setWinner(winningCandidateAddress);
        } else {
          setWinner('No winner declared');
        }
      } catch (error) {
        console.error('Error fetching winner:', error);
        setWinner('Error: Unable to fetch winner');
      } finally {
        setLoading(false);
      }
    };

    getWinner();
  }, [contractInstance]);

  return (

<div className="flex justify-center items-center mt-[30px] gap-[20px]">
  <button
    onClick={announceWinner}
    disabled={loading}
    className="w-[300px] text-lg font-semibold text-green-800 bg-clip-text bg-gradient-to-r from-green-400 to-green-600 
      border-2 border-green-800 rounded-lg py-3 px-6 
      transform transition duration-300 ease-in-out hover:text-green-800 hover:border-green-800 hover:shadow-lg hover:scale-105 
      focus:outline-none focus:ring-2 focus:ring-green-400"
  >
    {loading ? 'Processing...' : 'Announce Winner'}
  </button>

    <div className="text-center ">
        {loading ? (
          <h1 className="text-lg font-bold text-gray-700">Fetching Winner...</h1>
        ) : (
          <h1 className="text-lg font-bold text-gray-700">Winner: <span className='text-green-700'> {winner}</span></h1>
        )}  
    </div>


</div>


  
  );
};

export default Winner;
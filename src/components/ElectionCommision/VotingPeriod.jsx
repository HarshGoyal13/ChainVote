import React, { useRef, useState, useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';
import toast from 'react-hot-toast';
import Loader from '../Loader';

const VotingPeriod = () => {
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const { contractInstance } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState()

  const validateTimeFormat = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

  const convertTimeToSeconds = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 3600) + (minutes * 60); // Convert to seconds
  };

  const setTimePeriod = async (e) => {
    e.preventDefault();
  
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;
  
    if (!contractInstance) {
      toast.error('Contract instance not available');
      return;
    }
  
    if (!validateTimeFormat(startTime) || !validateTimeFormat(endTime)) {
      toast.error('Invalid time format');
      return;
    }
  
    if (startTime >= endTime) {
      toast.error('Start time must be earlier than end time');
      return;
    }
  
    // Convert start time and end time to seconds
    const startSeconds = convertTimeToSeconds(startTime);
    const endSeconds = convertTimeToSeconds(endTime);
  
    console.log("Start in seconds: ", startSeconds);
    console.log("End in seconds: ", endSeconds);
  
    // Remove check for future time validation. It's okay to select a future time now.
  
    setLoading(true);
    setMessage("Wait For Set Time period");
  
    try {
      await contractInstance.setVotingPeriod(startSeconds, endSeconds);
      startTimeRef.current.value = "";
      endTimeRef.current.value = "";
      toast.success('Voting period set successfully!');
      console.log(`Voting period set from ${startSeconds} to ${endSeconds}`);
    } catch (error) {
      console.error('Error setting voting period:', error);
      toast.error(error.message || 'Error: Voting Time Period');
    } finally {
      setLoading(false);
      setMessage("");
    }
  };
  
  

  return (
    <section className="px-5 lg:px-0 mt-[30px] items-center">
      {loading && <Loader message={message}/>}
      <div className="w-full max-w-[600px] mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-10">
        <h3 className="text-white text-[22px] leading-9 font-bold mb-10">
          Time <span className="text-green-500">Period</span> For Voting!
        </h3>
        <form className="py-4 md:py-0" onSubmit={setTimePeriod}>
          <div className="mb-5">
            <input
              type="time"
              ref={startTimeRef}
              placeholder="Enter Start Time"
              name="Start Time"
              aria-label="Start Time"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="time"
              ref={endTimeRef}
              placeholder="Enter End Time"
              name="End Time"
              aria-label="End Time"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
            />
          </div>
          <div className="mt-7 flex justify-center items-center">
            <button
              type="submit"
              className="w-full max-w-[300px] bg-gradient-to-r from-green-600 to-green-800 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Set Time'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VotingPeriod;

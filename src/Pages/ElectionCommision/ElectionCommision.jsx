import React, { useContext, useEffect, useState } from 'react'
import VotingStatus from '../../components/ElectionCommision/VotingStatus'
import VotingPeriod from '../../components/ElectionCommision/VotingPeriod'
import Winner from '../../components/ElectionCommision/Winner'
import EmergencyStop from '../../components/ElectionCommision/EmergencyStop'
import Footer from "../../components/Footer"
import {Web3Context} from "../../context/Web3Context"



const ElectionCommision = () => {

  const {contractInstance} = useContext(Web3Context);
  const [electionCommision, setElectionCommision] = useState();

  const getElectionCommision  = async ()=>{
      if(!contractInstance){
        throw new Error("Not Geting Contract Instance");
      }
      try{
          const data = await contractInstance.electionCommission();
          console.log("election Commision",data);
          setElectionCommision(data);
      }catch(error){
        console.log("Error:Fetching Election Commision");
      }
  }
  useEffect(()=>{
      contractInstance && getElectionCommision();
  },[contractInstance])

  return (
    <div className='px-5 lg:px-0'>
      
        <VotingStatus/>

        <div className=" mt-5  bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-2xl border border-gray-700 hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-xl mx-auto">
    <h1 className="text-2xl  font-bold mb-2">Election Commission</h1>
    <p className="text-green-400 text-lg font-bold leading-relaxed">
        {electionCommision}
    </p>
</div>


        <VotingPeriod/>

        <Winner/>

        <EmergencyStop/>


      <div className="mt-10">
      <Footer/>
    </div>

    </div>
  )
}

export default ElectionCommision
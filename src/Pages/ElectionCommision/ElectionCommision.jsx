import React from 'react'
import VotingStatus from '../../components/ElectionCommision/VotingStatus'
import VotingPeriod from '../../components/ElectionCommision/VotingPeriod'
import Winner from '../../components/ElectionCommision/Winner'
import EmergencyStop from '../../components/ElectionCommision/EmergencyStop'
import Footer from "../../components/Footer"

const ElectionCommision = () => {
  return (
    <div className='px-5 lg:px-0'>
      
        <VotingStatus/>

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
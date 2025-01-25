import { Route, Routes, useNavigate } from "react-router-dom"
import {Web3Context} from "./context/Web3Context"
import Home from "./Pages/Home"
import RegisterVoter from "./Pages/Voter/RegisterVoter"
import VoterList from "./Pages/Voter/VoterList"
import Navbar from "./components/Navbar"
import { useContext, useEffect } from "react"
import RegisterCandidate from "./Pages/Candidate/RegisterCandidate"
import CandidateList from "./Pages/Candidate/CandidateList"
import ElectionCommision from "./Pages/ElectionCommision/ElectionCommision"
import CastVote from "./Pages/CastVote"
import ContactUs from "./Pages/ContactUs"
import TokenMarketPlace from "./Pages/TokenMarketPlace/TokenMarketPlace"



function App() {


  const {selectedAccount} = useContext(Web3Context)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!selectedAccount){
      navigate('/');
    }
  }, [selectedAccount]);

  return (
    <div >

 

    <Navbar/>

    <Routes>

    <Route path={"/"}  element={<Home/>} />


    <Route path={"/Register-voter"}  element={<RegisterVoter/>} />
    <Route path={"/voterList"}  element={<VoterList/>} />

    <Route path={"/register-candidate"} element={<RegisterCandidate/>} />
    <Route path={"/candidateList"} element={<CandidateList/>} />

    <Route path={"/election-commision"} element={<ElectionCommision/>} />

    <Route path={"/CastVote"} element={<CastVote/>} />

    <Route path={"/token-marketplace"} element={<TokenMarketPlace/>} />

    <Route path={"/contactus"} element={<ContactUs/>} />


    </Routes>


      

  
    </div>
  )
}

export default App

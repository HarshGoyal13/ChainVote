
import { useRef , useContext, useState} from "react";
import { Web3Context  } from "../context/Web3Context";
import VotingStatus from "../components/ElectionCommision/VotingStatus"
import toast from "react-hot-toast";
import Footer from "../components/Footer"


const CastVote = ()=>{
  const {contractInstance} = useContext(Web3Context)

  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState();

  const voterIdRef = useRef(null);
  const candidateIdRef = useRef(null);


  const voteCandidate=async(e)=>{
      try{
        e.preventDefault();
        setLoading(true);
        setMessage("Wait for cast Vote");
        const voterId = voterIdRef.current.value;
        const candidateId = candidateIdRef.current.value;
        await contractInstance.castVote(voterId,candidateId)
        console.log("Voted successful")
        setLoading(false);
        setMessage("");
        toast.success("Vote Successfully");
      }catch(error){
        toast.error("Error: Casting Vote")
        console.error(error)
      }
  }
  return(

      <div className=" justify-center items-center ">
        <VotingStatus/>
        <div className=" mt-8 w-full max-w-[600px] mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-10">
        <h3 className="text-white text-[28px] font-extrabold text-center mb-8">
        Cast <span className="text-green-400">Vote</span> 👍🏻
      </h3>

          <form onSubmit={voteCandidate} className="space-y-6">
            <div>
              <label 
                htmlFor="voterId" 
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Voter ID:
              </label>
              <input
                type="text"
                id="voterId"
                ref={voterIdRef}
                className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
                placeholder="Enter your Voter ID"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="candidateId" 
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Candidate ID:
              </label>
              <input
                type="text"
                id="candidateId"
                ref={candidateIdRef}
                className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
                placeholder="Enter Candidate ID"
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-800 text-white text-lg font-semibold py-3 rounded-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Cast Vote 
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10">
      <Footer/>
    </div>

      </div>
  
  )
}
export default CastVote;
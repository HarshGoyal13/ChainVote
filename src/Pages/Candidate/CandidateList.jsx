

import React, { useEffect, useState, useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';
import Loader from "../../components/Loader"
import VotingStatus from "../../components/ElectionCommision/VotingStatus"
import Footer from "../../components/Footer"


const CandidateList = () => {
  const { contractInstance } = useContext(Web3Context);
  const [candidateList, setCandidateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState()




  useEffect(() => {
    const fetchCandidateList = async () => {
      setLoading(true);
      setMessage("Fetching list of Candidates...");
      try {
        const candidates = await contractInstance.getCandidateList();
        console.log(candidates);
        const updatedCandidates = await Promise.all(candidates.map(async (candidate) => {
        const [name,party, age,image, gender,id, voterAddress, totalVotes] = candidate;

          return {
            name,
            age: age.toString(),
            CandidateId : parseInt(id, 10),
            partyName:party,
            voterAddress,
            imageUrl: image,
            total_votes: totalVotes
          };
        }));
        setCandidateList(updatedCandidates);


      } catch (err) {
        console.error('Error fetching voters list:', err);
      } finally {
        setLoading(false);
        setMessage("");
      }

    };

    if (contractInstance) {
        fetchCandidateList();
    }
  }, [contractInstance]);

  return (

    <section className="px-5 lg:px-0 ">
      <VotingStatus/>
      <div className="w-full max-w-4xl mt-12 mx-auto rounded-lg shadow-xl md:p-10 bg-gray-900 text-white">
        <h3 className="text-3xl font-bold mb-10 text-center ">
          Candidate <span className="text-teal-500">List</span>!
        </h3>
  
        {loading && <Loader message={message}/>}
  
  
        {!loading &&   candidateList.length === 0 && (
          <p className="text-center text-gray-400">No Candidates available.</p>
        )}
  
        {!loading &&   candidateList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-center text-gray-300">Image</th>
                  <th className="px-4 py-2 text-center text-gray-300">Name</th>
                  <th className="px-4 py-2 text-center text-gray-300">Candidate Id</th>
                  <th className="px-4 py-2 text-center text-gray-300">Party</th>
                  <th className="px-4 py-2 text-center text-gray-300">Age</th>
                  <th className="px-4 py-2 text-center text-gray-300">Address</th>
                  <th className="px-4 py-2 text-center text-gray-300">Total Votes</th>
                </tr>
              </thead>
              <tbody>
                {candidateList.map((candidate, index) => (
                  <tr
                    key={index}
                    className="bg-gray-800 hover:bg-gray-600 transition duration-300"
                  >
                    <td className="px-4 py-2 text-center">
                      {candidate.imageUrl ? (
                        <img
                          alt={`${candidate.name}'s photo`}
                          src={candidate.imageUrl}
                          className="w-16 h-16 rounded-full mx-auto object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{candidate.name || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.CandidateId || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.partyName|| 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.age || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.voterAddress || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.total_votes || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-10">
      <Footer/>
    </div>


    </section>
  
  );
};

export default CandidateList;
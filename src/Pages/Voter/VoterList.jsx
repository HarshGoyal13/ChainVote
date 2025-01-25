



import React, { useEffect, useState, useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';
import Loader from "../../components/Loader"
import VotingStatus from '../../components/ElectionCommision/VotingStatus';
import Footer from "../../components/Footer"


const VoterList = () => {
  const { contractInstance } = useContext(Web3Context);
  const [voterList, setVoterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState()



  useEffect(() => {
    const fetchVoterList = async () => {
      setLoading(true);
      setMessage("Fetching list of Voters...");
      try {
        const voters = await contractInstance.getVoterList();
        const updatedVoters = await Promise.all(voters.map(async (voter) => {
        const [name, age, voterId,image, gender, voteCandidateId, voterAddress] = voter;

          return {
            name,
            voter_id : parseInt(voterId, 10),
            age: age.toString(),
            voterAddress,
            imageUrl: image,
            vote_to: voteCandidateId
          };
        }));
        setVoterList(updatedVoters);


      } catch (err) {
        console.error('Error fetching voters list:', err);
      } finally {
        setLoading(false);
        setMessage("");
      }

    };

    if (contractInstance) {
      fetchVoterList();
    }
  }, [contractInstance]);

  return (

    <section className="px-5 lg:px-0">
       <VotingStatus/>
      <div className="w-full  mt-12 max-w-4xl mx-auto rounded-lg shadow-xl md:p-10 bg-gray-900 text-white">
        <h3 className="text-3xl font-bold mb-10 text-center ">
          Voter <span className="text-teal-500">List</span>!
        </h3>
  
        {loading && <Loader message={message}/>}
  
  
        {!loading &&   voterList.length === 0 && (
          <p className="text-center text-gray-400">No voters available.</p>
        )}
  
        {!loading &&   voterList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-center text-gray-300">Image</th>
                  <th className="px-4 py-2 text-center text-gray-300">Name</th>
                  <th className="px-4 py-2 text-center text-gray-300">VoterId</th>
                  <th className="px-4 py-2 text-center text-gray-300">Age</th>
                  <th className="px-4 py-2 text-center text-gray-300">Address</th>
                  <th className="px-4 py-2 text-center text-gray-300">Vote to</th>
                </tr>
              </thead>
              <tbody>
                {voterList.map((voter, index) => (
                  <tr
                    key={index}
                    className="bg-gray-800 hover:bg-gray-600 transition duration-300"
                  >
                    <td className="px-4 py-2 text-center">
                      {voter.imageUrl ? (
                        <img
                          alt={`${voter.name}'s photo`}
                          src={voter.imageUrl}
                          className="w-16 h-16 rounded-full mx-auto object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{voter.name || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{voter.voter_id || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{voter.age || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{voter.voterAddress || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{voter.vote_to || 'N/A'}</td>
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

export default VoterList;
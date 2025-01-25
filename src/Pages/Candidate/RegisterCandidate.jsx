import React, { useState, useContext} from 'react'
import {Web3Context} from "../../context/Web3Context"
import toast from 'react-hot-toast'
import { FiUpload } from 'react-icons/fi';
import { uploadFileToPinata } from "../../utils/Pinata";
import Loader from '../../components/Loader';
import {HashLoader} from "react-spinners"
import { Link, useNavigate } from 'react-router-dom';
import VotingStatus from "../../components/ElectionCommision/VotingStatus"
import Footer from "../../components/Footer"
import axios from 'axios';





const RegisterCandidate = () => {



  const [loading, setLoading] = useState(false)
  const { contractInstance } = useContext(Web3Context);
  const [message , setMessage] =  useState();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name:"",
    age:"",
    party:"",
    gender:"",
    image:"",
    email:""
  })


  const handelFormData = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
};

const addDataInDB = async () => {
  const data = {
    name: formData.name,
    party: formData.party,
    email: formData.email,
    age: formData.age,
    imageUrl: formData.image,
  };

  try {
    const res = await axios.post("http://localhost:8080/voting/candidate/addCandidate", data);
    console.log(res);

    if (res.status === 201 || res.status === 200) {
      toast.success("Data registered in DB!");
      return true; 
    }
  } catch (err) {
    console.error("Error adding data to DB:", err);
    toast.error("Failed to add in DB. Please try again.");
    return false; 
  }
};


const handleFileUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setLoading(true);
    setMessage("Wait For Image Uploading");
    const ipfsHash = await uploadFileToPinata(file);
    setFormData({ ...formData, image: `https://gateway.pinata.cloud/ipfs/${ipfsHash}` });
    toast.success("Image uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload image. Please try again.");
  } finally {
    setLoading(false);
  }
};

    const handelRegisterCandidate = async(e)=>{
      e.preventDefault();
      try{
        if(!contractInstance){
          throw new Error("Contract instance not found");
        }
        setLoading(true);
        setMessage("Wait For Registration")
        const ageNumber = parseInt(formData.age, 10);
        if (isNaN(ageNumber) || ageNumber <= 0) {
          toast.error("Age must be a positive number");
          return;
        }
        await contractInstance.registerCandidate(formData.name,formData.image,formData.party, ageNumber, formData.gender);
        const dbSuccess = await addDataInDB();
        if (!dbSuccess) {
          throw new Error("Failed to register candidate in DB");
        }
        console.log("Candidate registered on the blockchain");
        toast.success('Candidate Register successfully');
        setFormData({ name: "", age: "", gender: "", image: "",party:""});
        navigate("/candidateList")
        setMessage("");
        setLoading(false)

      }catch(error){
        console.log(error);
        toast.error('Something went wrong in  Candidate Registration');
        setLoading(false)
      }
    }




  return (


  <section className="px-5 lg:px-0 ">
      <VotingStatus/>
    {loading && <Loader message={message}/>}
    <div className="w-full max-w-[600px] mt-[30px] mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-10">
      <h3 className="text-white text-[28px] font-extrabold text-center mb-8">
        Register As, <span className="text-green-500">Candidate</span>!
      </h3>

      <form className="space-y-8" onSubmit={handelRegisterCandidate}>

        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              id='name'
              value={formData.name}
              placeholder="Enter your name"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
              onChange={(e) => handelFormData("name", e.target.value)}
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Email 
          </label>
          <div className="relative">
            <input
              type="email"
              id='email'
              value={formData.email}
              placeholder="Enter your Mail"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
              onChange={(e) => handelFormData("name", e.target.value)}
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>


        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Age
          </label>
          <div className="relative">
            <input
              type="number"
              id='age'
              value={formData.age}
              placeholder="Enter your age"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
              onChange={(e) => handelFormData("age", e.target.value)}
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-calendar-alt"></i>
            </span>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Party Name
          </label>
          <div className="relative">
            <input
              type="text"
              id='party'
              value={formData.party}
              placeholder="Enter your age"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
              onChange={(e) => handelFormData("party", e.target.value)}
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-calendar-alt"></i>
            </span>
          </div>
        </div>


        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Gender
          </label>
          <select
            id='gender'
            value={formData.gender}
            className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:teal-400-500"
            required
            onChange={(e) => handelFormData("gender", e.target.value)}
            
          >
            <option value="">Select your gender</option>
            <option value="0">Not Specified</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </select>
        </div>


        <div className="flex flex-col items-center">
          <label className="w-full flex justify-center items-center border-[#3a3a43] border-2 rounded-lg py-5 px-8 text-white hover:bg-[#4b4b58] cursor-pointer transition-all duration-200">
            <FiUpload size={24} color="#8c6dfd" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {formData.image && (
            <div className="mt-4 text-center">
              <p className="text-white text-lg mb-2">Image Preview</p>
              <img
                src={formData.image}
                alt="Uploaded Campaign"
                className="w-full max-w-[300px] h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>


        <div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-green-800 transition duration-300 relative flex items-center justify-center"
          >
            {loading ? (
              <div className="absolute  inset-0 flex items-center justify-center">
                <HashLoader size={25} color="#fff" />
              </div>
            ) : (
              "SUBMIT"
            )}
          </button>
        </div>

        <Link
          to={"/candidateList"}
          className="block text-center text-[15px] font-semibold text-gray-300 hover:text-green-400 transition-all duration-300 relative"
        >
          <p className="inline-block pb-1 border-b-2 border-transparent hover:border-green-400">
            View Registered Candidates 
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </Link>



      </form>
    </div>

    <div className="mt-10">
      <Footer/>
    </div>
          

  </section>

  

  )
}

export default RegisterCandidate; 


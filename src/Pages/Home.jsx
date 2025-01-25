import { React } from 'react';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Footer from "../components/Footer"


function Home() {
  return (
    <>
   
    <div className="text-center  py-16 relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div className=" inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 opacity-30 rounded-full filter blur-3xl transform scale-150 -z-10"></div>
      <div className="  px-6 relative z-10">
      
        <h1 className="text-[60px] font-extrabold text-white mt-8 animate-slideIn leading-tight">
          Innovate, Participate & <br /> Shape Your <span className="text-[#FFD700]">Democracy</span>
        </h1>
        <p className="mt-6 text-[#E2E8F0] text-lg max-w-3xl mx-auto animate-fadeInDelay leading-relaxed">
          Experience seamless and secure electronic voting. Join us to empower every citizen and make democracy more accessible and transparent!
        </p>
  
      </div>
    </div>

    <div>
    <TechStack/>
    </div>

   <div>
   <About/>
   </div>

   <div className="">
    <Footer/>
   </div>
   
    </>
  );
}

export default Home;

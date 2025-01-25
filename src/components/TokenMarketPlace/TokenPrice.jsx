import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from "../Loader"

const TokenPrice = ({tokenMarketPlaceInstance}) => {
    const [tokenPrice, setTokenPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);

    useEffect(()=>{
        try{    

            if(!tokenMarketPlaceInstance){
                console.log("Token Matket Place Instance Not Available");
            }
            const fetchTOken = async()=>{
              setLoading(true);
              setMessage("Wait for Fetching token Price...")
                const tokenPriceInWei = await tokenMarketPlaceInstance.tokenPrice();
                const tokenPriceInEth = ethers.formatEther(tokenPriceInWei);
                setTokenPrice(tokenPriceInEth);
                setLoading(false);
                setMessage("")
            }
            tokenMarketPlaceInstance && fetchTOken();

        }catch(error){
            setLoading(false);
            toast.error("Error : Fetching Token Price");
            console.log(error);
        }
    },[tokenMarketPlaceInstance])

  return (
<div className="top-0 left-0 w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white text-lg font-medium py-4 px-6 shadow-lg z-50 flex justify-between items-center">
  {loading && <Loader message={message}/> }
  <span className="text-2xl font-bold">Token Price:</span> 
  <span className="text-2xl font-bold animate-pulse">{tokenPrice} ETH</span>
</div>
  )
}

export default TokenPrice
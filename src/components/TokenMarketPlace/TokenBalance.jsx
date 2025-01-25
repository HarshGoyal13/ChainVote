import React, { useContext, useEffect, useState } from 'react'
import {Web3Context} from "../../context/Web3Context"
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import Loader from "../Loader"

const TokenBalance = ({erc20ContractInstance}) => {

    const {selectedAccount} = useContext(Web3Context);
    const [userTokenBalance, setUserTokenBalance] = useState("0");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(()=>{

        const fetchTokenBalance = async ()=>{
            if(!erc20ContractInstance){
                console.log("erc20ContractInstance Not found");
            }
            try{
                setLoading(true);
                setMessage("Fetching Token Balance..")
                const TokenBalanceInWei = await erc20ContractInstance.balanceOf(selectedAccount);
                const tokenBalanceInEth = ethers.formatEther(TokenBalanceInWei);
                setUserTokenBalance(tokenBalanceInEth)
                setLoading(false);
                setMessage("")
            }catch(error){
              setLoading(false);
                console.log(error);
                toast.error("Error:Fetching User Token Balance");
            }
        }
        erc20ContractInstance && fetchTokenBalance();

    },[selectedAccount,erc20ContractInstance ])

  return (
<div className="flex justify-center items-center mt-10">
  {loading && <Loader message={message}/>}
  <div className="bg-gray-800 text-gray-200 py-6 px-8 rounded-lg shadow-lg w-full max-w-md">
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-gray-100">Your Token Balance</h3>
      <p className="mt-2 text-4xl font-bold text-green-400 tracking-wide">
        {userTokenBalance}
      </p>
    </div>
  </div>
</div>



  )
}

export default TokenBalance
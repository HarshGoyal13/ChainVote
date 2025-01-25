import React, { useContext, useEffect, useState } from 'react';
import TokenPrice from '../../components/TokenMarketPlace/TokenPrice';
import BuySellToken from '../../components/TokenMarketPlace/BuySellToken';
import TokenBalance from '../../components/TokenMarketPlace/TokenBalance';
import { useNavigate } from 'react-router-dom';
import { Web3Context } from "../../context/Web3Context";
import { ethers } from "ethers";
import erc20Abi from "../../Constant/erc20Abi.json";
import tokenMarketPlaceAbi from "../../Constant/tokenMarketPlaceAbi.json";
import toast from 'react-hot-toast';
import Footer from "../../components/Footer"

const TokenMarketPlace = () => {
  const navigate = useNavigate();
  const [tokenMarketPlaceInstance, setTokenMarketPlaceInstance] = useState(null);
  const [erc20ContractInstance, setErc20ContractInstance] = useState(null);
  const { signer, provider } = useContext(Web3Context);


  useEffect(() => {
    const erc20TokenInit = () => {
      try {
        const contractAddress = "0x2dA921c6aE01178fB7e82861bA56E3EB5989f4f8";
        const erc20ContractInstance = new ethers.Contract(contractAddress, erc20Abi, provider);
        setErc20ContractInstance(erc20ContractInstance);
      } catch (error) {
        toast.error("Error In Erc20 Token Contract Instance");
        console.log(error);
      }
    };
    provider && erc20TokenInit();
  }, [provider]);

  useEffect(() => {
    const tokenMarketPlaceInit = () => {
      try {
        const contractAddress = "0xB032F754f90A9d69F8042F5DEf58B0a42c654072";
        const tokenMarketplaceContractInstance = new ethers.Contract(contractAddress, tokenMarketPlaceAbi, signer);
        setTokenMarketPlaceInstance(tokenMarketplaceContractInstance);
      } catch (error) {
        toast.error("Error In  Token Market-Place Contract Instance");
        console.log(error);
      }
    };
    signer && tokenMarketPlaceInit();
  }, [signer]);

  return (
<>
  <div className="flex flex-col items-center justify-center min-h-screen">
    {tokenMarketPlaceInstance && erc20ContractInstance ? (
      <>
        <TokenPrice tokenMarketPlaceInstance={tokenMarketPlaceInstance} />
        <TokenBalance erc20ContractInstance={erc20ContractInstance} />
        
        {/* Center BuySellToken component */}
        <div className="flex justify-center w-full">
          <BuySellToken 
            tokenMarketPlaceInstance={tokenMarketPlaceInstance} 
            erc20ContractInstance={erc20ContractInstance} 
          />
        </div>
        
      </>
    ) : (
      <div className="text-center text-white">Loading Contract Instances...</div>
    )}
  </div>

  <div className="mt-10">
    <Footer />
  </div>
</>


  );
};

export default TokenMarketPlace;

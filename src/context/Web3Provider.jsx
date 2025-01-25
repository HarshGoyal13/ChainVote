import { useEffect, useState } from "react";
import {Web3Context} from "./Web3Context";
import GetWeb3State from "../utils/GetWeb3State"
import {HandelAccountChange} from "../utils/HandelAccountChange"
import {HandelChainId} from "../utils/HandelChainId"



const Web3Provider = ({children}) => {

    const [web3State, setWeb3State] = useState({
        contractInstance:null,
        chainID:null,
        selectedAccount:null,
        signer:null,
        provider:null
    })

    const handelWallet = async () => {
        try{
            const {contractInstance,chainID,selectedAccount,signer,provider} = await GetWeb3State();
            setWeb3State({contractInstance,chainID,selectedAccount,signer,provider});
        }catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{
        // accountsChanged: Triggered when the user switches accounts in MetaMask.
        window.ethereum.on('accountsChanged',()=> HandelAccountChange(setWeb3State));
  
        // chainChanged: Triggered when the user switches to a different blockchain network (e.g., Ethereum Mainnet to Polygon).
        window.ethereum.on('chainChanged',()=> HandelChainId(setWeb3State));
  
        return ()=>{
        // Remove the listeners to avoid memory leaks or duplicate event handlers when the component is destroyed or re-rendered.
          window.ethereum.removeListener('accountsChanged',()=> HandelAccountChange(setWeb3State));
          window.ethereum.removeListener('chainChanged',()=> HandelChainChange(setWeb3State));
        }
  
      })
     

    return (
        <Web3Context.Provider value={{...web3State, handelWallet}}>
        {children}
        </Web3Context.Provider>
    )


}

export default Web3Provider
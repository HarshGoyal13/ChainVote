import {ethers} from "ethers"
import VotingAbi from "../Constant/VotingDappabi.json"
const GetWeb3State = async() => {
    try{

        if(!window.ethereum){
            throw new Error("Metamask Not Installed");
        }

        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts"
        })
        const selectedAccount = accounts[0];

        const chainIdHex = await window.ethereum.request({
            method:"eth_chainId"
        })
        const chainID = parseInt(chainIdHex, 16);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = "0x6A8F7a79d194EcDBE3f2e623FC9d7eE0cb0C86C8";
        const contractInstance = new ethers.Contract(contractAddress, VotingAbi, signer);

        return {contractInstance,chainID,selectedAccount, signer,provider};

        
    }catch(error){
        console.log(error);
    }
 


}

export default GetWeb3State
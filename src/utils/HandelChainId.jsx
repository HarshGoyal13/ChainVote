
export const HandelChainId = async(setWeb3State) => {

    const chainIdHex = await window.ethereum.request({
        method:"eth_chainId"
    })
    const chainID = parseInt(chainIdHex, 16);
    setWeb3State((prevState) => ({
        ...prevState,
        chainID
    }))
}


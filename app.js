const axios = require('axios')
const {ethers} = require('ethers')

// const address='0x805B11d92Dcf960f14f5828E0c0F10772eE1E0D8' //azupreme
// const address='0xED5AF388653567Af2F388E6224dC7C4b3241C544'//azuki
// const address='0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'// crypto punks
// const address='0x395585cDCBD89d11c47EAd0567dC5b1eEEED471E'// test
const apiKey='MSV9PH9SH128GIBNEHW7IGP2WU2TN26RSU'
const geturl= (address,apiKey)=>{
    const url=`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    return url;
}

const infuraUrl='https://mainnet.infura.io/v3/0f9bcfd505d7446cb8d7a69bdef43497'
/**
 * It takes the contract address and the ABI from Etherscan and uses it to get the contract name, total
 * supply, cost, max supply, max mint amount per tx, and revealed.
 * </code>
 */
const getAbi=async(url)=>{
    const res=await axios.get(url)
    const abi=JSON.parse(res.data.result)
    // console.log(abi)
    const provider=new ethers.providers.JsonRpcProvider(infuraUrl)
    const contract=new ethers.Contract(
      address,
      abi,
      provider
    )

    if(contract.name){
        const name=await contract.name();
        console.log("name: ",name);
    }else{
        console.log("name not found");
    }

    if(contract.totalSupply){
        const totalSupply=await contract.totalSupply()
        console.log("totalSupply = ",totalSupply.toString())
    }else{
        console.log("totalSupply not found");
    }
    
    if(contract.cost){
        const cost=await contract.cost();
        costeth = cost/1000000000000000000;
        console.log("cost = ",costeth.toString())
    }else if(contract.price){
        const cost=await contract.price();
        costeth = cost/1000000000000000000;
        console.log("cost = ",costeth.toString())
    }else{
        console.log("cost not found");
    }

    if(contract.maxSupply){
        const maxSupply = await contract.maxSupply()
        console.log("maxSupply = ",maxSupply.toString())
    }else{
        console.log("max Supply not found");
    }

    if(contract.maxMintAmountPertx){
        const maxMintAmountPerTx = await contract.maxMintAmountPertx()
        console.log("maxMintAmountPerTx = ",maxMintAmountPerTx.toString())
    }else{
        console.log("maxMintAmountPerTx not found");
    }

    if(contract.revealed){
        const revealed = await contract.revealed()
        console.log("revealed: ",revealed.toString())
    }else{
        console.log("revealed not found");
    }

}
// geturl()

// getAbi(geturl(address,apiKey))
module.exports = {
    getAbi,
    geturl
}
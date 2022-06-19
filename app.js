const axios = require('axios')
const {ethers} = require('ethers')

// const address='0x805B11d92Dcf960f14f5828E0c0F10772eE1E0D8' //azupreme
const address='0xED5AF388653567Af2F388E6224dC7C4b3241C544'//azuki
// const address='0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'// crypto punks
const apiKey='MSV9PH9SH128GIBNEHW7IGP2WU2TN26RSU'
const url=`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
const infuraUrl='https://mainnet.infura.io/v3/0f9bcfd505d7446cb8d7a69bdef43497'
/**
 * It takes the contract address and the ABI from Etherscan and uses it to get the contract name, total
 * supply, cost, max supply, max mint amount per tx, and revealed.
 * </code>
 */
const getAbi=async()=>{
    const res=await axios.get(url)
    const abi=JSON.parse(res.data.result)
    // console.log(abi)
    const provider=new ethers.providers.JsonRpcProvider(infuraUrl)
    const contract=new ethers.Contract(
      address,
      abi,
      provider
    )

    const name=await contract.name()
    const totalSupply=await contract.totalSupply()
    if(contract.cost){
        const cost=await contract.cost();
        costeth = cost/1000000000000000000;
        console.log(costeth.toString())
    }else{
        console.log("cost not found");
    }
    if(contract.maxSupply){
        const maxSupply = await contract.maxSupply()
        console.log(maxSupply.toString())
    }else{
        console.log("max Supply not found");
    }

    // const maxMintAmountPerTx = await contract.maxMintAmountPertx()
    // const maxSupply = await contract.maxSupply()
    // constconst revealed = await contract.revealed()
    
    console.log(name)
    // console.log(totalSupply.toString())
    
    // console.log(maxMintAmountPerTx.toString())
   
    // console.log(revealed.toString())
}
getAbi()
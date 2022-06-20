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
 let info= [];
 const getAbi=async(url,address)=>{
     const res=await axios.get(url)
     const abi=JSON.parse(res.data.result)
     const address2 = address;
     // console.log(abi)
     const provider=new ethers.providers.JsonRpcProvider(infuraUrl)
     const contract=new ethers.Contract(
       address2,
       abi,
       provider
     )
   
     if(contract.name){
         const name=await contract.name();
         // console.log("name: ",name); 
         info[1]= `name: ${name}\n`;
 
     }else{
         // console.log("name not found");
         info[1]= `name not found\n`;
     }
 
     if(contract.totalSupply){
         const totalSupply=await contract.totalSupply()
         // console.log("totalSupply = ",totalSupply.toString())
         info[2]= `totalSupply = ${totalSupply.toString()}\n`;
     }else{
         // console.log("totalSupply not found");
         info[2]= `totalSupply not found\n`;
     }
     
     
     if(contract.cost){
         const cost=await contract.cost();
         costeth = cost/1000000000000000000;
         info[3] = `cost = ${costeth.toString()}\n`
     }else if(contract.price){
         const cost=await contract.price();
         costeth = cost/1000000000000000000;
         info[3] = `cost = ${costeth.toString()}\n`
     }else{
         info[3] = "cost not found\n";
     }
 
     if(contract.maxSupply){
         const maxSupply = await contract.maxSupply()
         info[4] = `maxSupply = ${ maxSupply.toString()}\n`
     }else{
         info[4] = "max Supply not found\n";
     }
 
     if(contract.maxMintAmountPertx){
         const maxMintAmountPerTx = await contract.maxMintAmountPertx()
         info[5] = `maxMintAmountPerTx = ${maxMintAmountPerTx.toString()}\n`
     }else{
         info[5] = "maxMintAmountPerTx not found\n";
     }
 
     if(contract.revealed){
         const revealed = await contract.revealed()
         info[6] = `revealed: ${revealed.toString()}\n`
     }else{
         info[6] = "revealed not found\n";
     }
 
     // if(contract.totalSupply){
     //     const revealed = await contract.revealed()
     //     info[6] = `revealed: ${revealed.toString()}\n`
     // }else{
     //     info[6] = "revealed not found\n";
     // }
     return info;
 
 }
// geturl()

// getAbi(geturl(address,apiKey))
module.exports = {
    getAbi,
    geturl
}
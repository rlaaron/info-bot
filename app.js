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
 const getAbi=async(url,address)=>{
    let info = new Object();
     const res=await axios.get(url)
     const abi=JSON.parse(res.data.result)
     const address2 = address;
    //  console.log(abi)
     const provider=new ethers.providers.JsonRpcProvider(infuraUrl)
     const contract=new ethers.Contract(
       address2,
       abi,
       provider
     )
   
    /* Checking if the contract has a name. If it does, it will return the name. If it doesn't, it will
    return "name not found". */
     if(contract.name){
         const name=await contract.name();
         // console.log("name: ",name); 
         info.name= `${name}\n`;
     }else{
         // console.log("name not found");
         info.name= `:grey_question:\n`;
     }
 
     
     /* Checking if the contract has a cost or price. If it does, it will return the cost or price. If
     it doesn't, it will return "Free". */
     if(contract.cost){
         const cost=await contract.cost();
         costeth = cost/1000000000000000000;
         info.cost = `${costeth.toString()}\n`
     }else if(contract.price){
         const cost=await contract.price();
         costeth = cost/1000000000000000000;
         info.cost = `${costeth.toString()}\n`
     }else if(contract.PRICE){
        const cost=await contract.PRICE();
        costeth = cost/1000000000000000000;
        info.cost = `${costeth.toString()}\n`
    }else{
         info.cost = "Free\n";
     }

    let totalSupply;
     /* Checking if the contract has a total supply. If it does, it will return the total supply. If it
     doesn't, it will return "total supply not found". */
     if(contract.totalSupply){
        totalSupply=await contract.totalSupply()
        // console.log("totalSupply = ",totalSupply.toString())
        // info[3]= `totalSupply = ${totalSupply.toString()}\n`;
        info.totalSupply = `${totalSupply.toString()}\n`;
    }else{
        // console.log("totalSupply not found");
        // info[3]= `totalSupply not found\n`;
        info.totalSupply = `:grey_question:\n`;
    }

    /* Checking if the contract has a max supply. If it does, it will return the max supply. If it
    doesn't, it will return "max supply not found". */
    let maxSupply;
     if(contract.maxSupply){
        maxSupply = await contract.maxSupply()
        //  info[4] = `maxSupply = ${ maxSupply.toString()}\n`
         info.maxsupply = `${ maxSupply.toString()}\n`
     }else if(contract.TOKEN_LIMIT){  
         maxSupply = await contract.TOKEN_LIMIT()
        // info[4] = `maxSupply = ${ maxSupply.toString()}\n`
        info.maxsupply = `${ maxSupply.toString()}\n`
    }else if(contract.MAX_SUPPLY){
         maxSupply = await contract.MAX_SUPPLY()
        // info[4] = `maxSupply = ${ maxSupply.toString()}\n`
        info.maxsupply = `${ maxSupply.toString()}\n`
    }else{
        //  info[4] = "max Supply: not found\n";
         info.maxsupply = ":grey_question:\n";
     }
 
     /* Checking if the contract has a max mint amount per tx. If it does, it will return the max mint
     amount per tx. If it doesn't, it will return "max mint amount per tx not found". */
     if(contract.maxMintAmountPertx){
         const maxMintAmountPerTx = await contract.maxMintAmountPertx()
        //  info[5] = `maxTx = ${maxMintAmountPerTx.toString()}\n`
         info.maxtx = `${maxMintAmountPerTx.toString()}\n`
     }else if(contract.MAX_JUDGE_MINT){
        const  maxMintAmountPerTx = await contract.MAX_JUDGE_MINT()
        // info[5] = `maxTx = ${ maxMintAmountPerTx.toString()}\n`
        info.maxtx = `${ maxMintAmountPerTx.toString()}\n`
    }else if(contract.maxMintSupply){
        const  maxMintAmountPerTx = await contract.maxMintSupply()
        // info[5] = `maxTx = ${ maxMintAmountPerTx.toString()}\n`
        info.maxtx = `${ maxMintAmountPerTx.toString()}\n`
    }else if(contract.maxMintAmount){
        const maxMintAmountPerTx = await contract.maxMintAmount()
        info.maxtx= `${ maxMintAmountPerTx.toString()}\n`
    }else{
        //  info[5] = "maxTx: not found\n";
         info.maxtx = ":grey_question:\n";
    }

     if(contract.PUBLIC_MINT_LIMIT_PER_WALLET){
         const maxMintWallet = await contract.PUBLIC_MINT_LIMIT_PER_WALLET()
        //  info[6] = `maxWallet = ${maxMintWallet.toString()}\n`
         info.maxWallet = `${maxMintWallet.toString()}\n`
     }else if(contract.MAX_PER_ACCOUNT){
        const maxSupply = await contract.MAX_PER_ACCOUNT()
        // info[6] = `maxWallet = ${maxSupply.toString()}\n`
        info.maxWallet = `${maxSupply.toString()}\n`
    }else if(contract.MAX_PER_WALLET){
        const maxSupply = await contract.MAX_PER_WALLET()
        info.maxWallet = `${ maxSupply.toString()}\n`
    }else if(contract.limitPerAccount){
        const maxSupply = await contract.limitPerAccount()
        info.maxWallet = `${ maxSupply.toString()}\n`
    }else{
        //  info[6] = "maxWallet: not found\n";
         info.maxWallet = ":grey_question:\n";
     }
 
     /* Checking if the contract has a revealed function. If it does, it will return the revealed
     function. If it doesn't, it will return "revealed not found". */
     if(contract.revealed){
         const revealed = await contract.revealed()
        //  info[7] = `revealed: ${revealed.toString()}\n`
         info.reveled = `${revealed.toString()}\n`
     }else{
        //  info[7] = "revealed: not found\n";
         info.reveled = "Insta Reveal\n";
     } 
     let left =  maxSupply - totalSupply;
    //  info[8] = `left: ${left.toString()}\n`;
     info.left = `${left.toString()}\n`;
     return info;
 
 }
// geturl()

// getAbi(geturl(address,apiKey))
module.exports = {
    getAbi,
    geturl
}
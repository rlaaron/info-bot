
const axios = require('axios')
const {ethers} = require('ethers')
const Discord = require("discord.js")
const intents = new Discord.Intents(131071)
const client = new Discord.Client({ intents })
require('dotenv').config();

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

client.once("ready", (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
})
client.on('messageCreate',  async (msg) => {
    const prefix = "$";
    if (msg.author.bot) return;

    // if (!msg.content.startsWith(prefix))
    //     return msg.reply("Esto no es un comando");

    if (msg.content.startsWith(prefix)) {
    const argumentos = msg.content.slice(prefix.length).split(/ +/);
    const comando = argumentos.shift().toLowerCase();
    const addres2 = argumentos.toString(16);
    const resultPrmoise = getAbi(geturl(addres2,apiKey),addres2);
    (async () => {
        const result = await Promise.resolve(resultPrmoise)
        console.log(result);
        
        if (comando == "info") return  await msg.reply(`${result}`)
        console.log("cthi is info1"+Promise.resolve(result) );
    })();
    if (comando == "ping") return msg.reply("pong");
    

    }
    
})
client.login(process.env.DSTOKEN)


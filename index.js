const Discord = require("discord.js")
const intents = new Discord.Intents(131071)
const client = new Discord.Client({ intents })
require('dotenv').config();

const { getAbi, geturl } = require ("./app");
const apiKey='MSV9PH9SH128GIBNEHW7IGP2WU2TN26RSU'

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
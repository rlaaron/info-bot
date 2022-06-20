
const Discord = require("discord.js")
const intents = new Discord.Intents(131071)
const client = new Discord.Client({intents})

const { getAbi, geturl } = require ("./app");
const apiKey='MSV9PH9SH128GIBNEHW7IGP2WU2TN26RSU'

/* A function that is called when a message is created. */
client.on('messageCreate', async (message) => {
    if(message.channel.type === 'da')return;
    if(message.author.bot)return;

    let prefix = "$";

    if(!message.content.startswith(prefix))return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().tolowerCase()

    if(command === "info"){
        message.reply(getAbi(geturl(args,apiKey)))
    }

})
client.login("OTg4MjAyOTkyNDk2OTM5MDQ4.G3xaSk.ebCG_6-4iybgIxu4lgvGaztacKsLJA7D_uk9FM")
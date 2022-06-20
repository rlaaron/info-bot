
const Discord = require("discord.js")
const intents = new Discord.Intents(131071)
const client = new Discord.Client({ intents })
require('dotenv').config();

const { getAbi, geturl } = require ("./app");
const apiKey='MSV9PH9SH128GIBNEHW7IGP2WU2TN26RSU'

client.once("ready", (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
})
/* A function that is called when a message is created. */
client.on('messageCreate',  (msg) => {
    const prefix = "$";
    if (msg.author.bot) return;

    if (!msg.content.startsWith(prefix))
        return msg.reply("Esto no es un comando");

    if (msg.content.startsWith(prefix)) {
    const argumentos = msg.content.slice(prefix.length).split(/ +/);
    const comando = argumentos.shift().toLowerCase();
    console.log(argumentos);
    console.log(comando);

    if (comando == "ping") return msg.reply("pong");
    if (comando == "info") return msg.reply(getAbi(geturl(argumentos,apiKey)))
    }
})
client.login(process.env.DSTOKEN)
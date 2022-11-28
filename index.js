/* This is the code that connects the bot to the discord server. */
const Discord = require("discord.js")
const intents = new Discord.Intents(131071)
const client = new Discord.Client({ intents })
require('dotenv').config();

const { getAbi, geturl } = require("./app");
const apiKey = process.env.ETHERSCANKEY


/*Activate the bot and check the status*/
client.once("ready", (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
})

client.on('messageCreate', async (msg) => {
    const prefix = "$"; //command for call the bot
    if (msg.author.bot) return;
    /* This is the code that checks if the message starts with the prefix and then it splits the
    message into an array and then it takes the first element of the array and converts it to
    lowercase. */
    if (msg.content.startsWith(prefix)) {
        const arguments = msg.content.slice(prefix.length).split(/ +/);
        const comand = arguments.shift().toLowerCase();
        const addres2 = arguments.toString(16);
        try{
            const resultPrmoise = getAbi(geturl(addres2, apiKey), addres2);
            (async () => {
                const result = await Promise.resolve(resultPrmoise)
                if (comand == "c") {
                    /* Creating a message embed. */
                    const embed = new Discord.MessageEmbed()//
                        .setColor("BLUE")
                        .setTitle(`:pushpin: ${result.name}`)
                        .addFields(
                            { name: ":moneybag: Cost:", value: `${result.cost}`, inline: true },
                            { name: ":small_blue_diamond: TotalSupply", value: result.totalSupply, inline: true },
                            { name: ":small_blue_diamond: Max Supply", value: result.maxsupply, inline: true },
                            { name: ":small_blue_diamond: Max Tx", value: result.maxtx, inline: true },
                            { name: ":small_blue_diamond: Max Wallet", value: result.maxWallet, inline: true },
                            { name: ":small_blue_diamond: Reveled", value: result.reveled, inline: true },
                            { name: ":small_blue_diamond: Left", value: result.left, inline: true },
                        )
                        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png")
                    msg.reply({ embeds: [embed], components: [] })
                }
            })();
        }catch(err){
            console.log(err)
        }
    }


})
/* discord bot token */
client.login(process.env.DSTOKEN)
const Discord = require("discord.js")
const intents = new Discord.Intents(131071)
const client = new Discord.Client({ intents })
require('dotenv').config();

const { getAbi, geturl } = require("./app");
const apiKey = 'MSV9PH9SH128GIBNEHW7IGP2WU2TN26RSU'

client.once("ready", (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
})
client.on('messageCreate', async (msg) => {
    const prefix = "$";
    if (msg.author.bot) return;

    // if (!msg.content.startsWith(prefix))
    //     return msg.reply("Esto no es un comando");

    if (msg.content.startsWith(prefix)) {
        const argumentos = msg.content.slice(prefix.length).split(/ +/);
        const comando = argumentos.shift().toLowerCase();
        const addres2 = argumentos.toString(16);
        const resultPrmoise = getAbi(geturl(addres2, apiKey), addres2);
        (async () => {
            const result = await Promise.resolve(resultPrmoise)
            console.log(result);

            if (comando == "c") {
                const embed = new Discord.MessageEmbed()
                    .setColor("BLUE")
                    // .setAuthor(msg.author.username, msg.author.avatarURL())
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
                    // .setThumbnail("https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png")
                    // .setImage("https://img.seadn.io/files/b40b563604decde9160b2b3cd7b018fc.jpg?fit=max&auto=format")
                    // .setFooter("InfoBot")
                    // .setTimestamp()
                msg.reply({ embeds: [embed], components: [] })

            }
        })();
    }

})
client.login(process.env.DSTOKEN)
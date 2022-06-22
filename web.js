module. exports = {
    name: "embed",
   alias: [],
 execute (client, message, args) {
    const embedPrueba = new Discord.MessageEmbed()
    .setAuthor(` Autor del embed ${message.author.tag}`)
    .setTitle("Titulo del embed")
    .setDescription(`Descripción del embed. [Hipervinculo](https://discord.js.org/#/)`)
    .setTimestamp()
    .setColor("#313132")
    .addField("Titulo field", "Descripción field")
    .setFooter("Discord Js v13 Footer")
    .setThumbnail("https:// avatars.githubusercontent.com/u/26492485?s=200&v=4")
   .setImage("https://opencollective-production.s3.us-west-1.a .amazonaws. com/3155c0c0-412d-11ec-8d2d-053636eb5d04.png")
    
   message.reply({embeds: [embedPrueba]})
 }
  
}
   

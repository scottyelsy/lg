const discord = require("discord.js")
const roblox = require("noblox.js") 
const client = new discord.Client();




module.exports = {
  name: "search",
  description: "Get the Bot's ping",
  aliases: [],
  permissions: "Everyone",
  usage: "",
  cooldown: 2,
  async execute(message, args) {
 
      let username = args[0]
     if (username) {
       roblox.getIdFromUsername(username).then(id => { // gets user id for the specific part of the embed
         if (id) {
           roblox.getPlayerInfo(parseInt(id)).then(function(info) {
             let date = new Date(info.joinDate) 
             
             let embed = new discord.MessageEmbed()

             .setColor("BLUE") // sets the color of the embed
             .setURL(`https://roblox.com/users/${id}/profile`) // base link, changed by the variables 'id'
             .setTimestamp()
             .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`) // gets the roblox profile picture

             .addField("Username", info.username || 'Unresolvable', true) // everything in the embed is undefined, therefore can be changed by the variables
             .addField("User ID", id || 'Unresolvable', true)
             .addField("Blurb", info.blurb || 'Nothing', false)
             .addField("Status", info.status || 'Nothing', true)
             .addField("Account Age", `${info.age} days old` || 'Unresolvable')
             .addField("Register Date", `${date}` || 'Unresolvable')
                   .setFooter(
        "Legacy Games bot - Created by Alessandro#6904",
        "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
      )
             .addField("User Link", `https://roblox.com/users/${id}/profile`)
              message.channel.send({embed})
           })
         }

       }).catch(function (err) {
         message.channel.send("Sorry, that user doesn't seem to exist, double check your spelling and try again!") // catching error
       });
    } else {
       message.channel.send("Please provide a valid username, e.g. '!search ROBLOX'.") 
     }
        }
    
  
};

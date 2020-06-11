const Discord = require("discord.js");
const request = require("request-promise");

module.exports = {
  name: "groupinfo",
  description: "Displays group info",
  aliases: ["ginfo", "g-info", "group-info"],
  permissions: "Everyone",
  usage: "",
  cooldown: 2,
  async execute(message, args) {
    const groupId = "5962872";

    const groupData = await request(
      `https://groups.roblox.com/v1/groups/${groupId}`,
      {
        json: true
      }
    );

    const embed = new Discord.MessageEmbed()
      .setTitle("**__Group information__**")
      .setColor("ORANGE")
      .setDescription(`**Group Description**\n${groupData.description}`)
      .addField("Group Name:", `${groupData.name}`, true)
      .addField("Group ID:", `${groupData.id}`, true)
      .addField("Member Count:", `${groupData.memberCount}`, true)
      .addField("Group created:", `12th April 2020`, true)
      .addField("Owner username:", `${groupData.owner.displayName}`, true)
      .addField("Owner ID:", `${groupData.owner.userId}`, true)
      .addField(
        "Current group shout:",
        "`" + groupData.shout.body + "` - " + groupData.shout.poster.displayName
      )
      .setFooter(
        "Legacy Games bot - Created by Alessandro#6904",
        "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
      )
      .setTimestamp()
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
      );

    message.channel.send(embed);
  }
};

const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Displays your avatar",
  aliases: ["pfp"],
  permissions: "Everyone",
  usage: "[@user]",
  cooldown: 2,
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(0x333333)
      .setAuthor(user.username)
      .setImage(user.avatarURL({ format: "png", dynamic: true, size: 1024 }));
    message.channel.send(avatarEmbed);
  }
};

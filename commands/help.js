const prefix = "!";
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "List all of the commands or info about a specific command.",
  aliases: ["commands"],
  permissions: "Everyone",
  usage: "[command name]",
  cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Here's a list of all my commands:");

      const datap = commands.map(command => command.name).join("\n > !");
      const user = message.member;

      const embed = new Discord.MessageEmbed()
        .setTitle("Commands List")
        .setColor("RED")
        .setFooter(
          "Legacy Games bot - Created by Alessandro#6904",
          "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
        )
        .setTimestamp()
        .setAuthor(
          "Message sent for " + message.author.username,
          message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })
        )
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
        )
        .setDescription(
          "You can send`!help [command name]` to get info on a specific command!\n \n **__Commands__**\n> !" +
            datap
        );

      data.push(embed);

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("I've sent you a DM with all my commands!");
        })
        .catch(error => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply("it seems like I can't DM you!");
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    const nm = `**Name:** ${command.name}`;

    const ali = `**Aliases:** ${command.aliases.join(", ")}`;
    const desc = `**Description:** ${command.description}`;
    const usag = `**Usage:** ${prefix}${command.name} ${command.usage}`;
    const perm = `**Permissions:** ${command.permissions}`;

    const cd = `**Cooldown:** ${command.cooldown || 3} second(s)`;

    const emb = new Discord.MessageEmbed()
      .setTitle("Command - !" + name)
      .setColor("RANDOM")
      .setDescription(ali + "\n" + desc + "\n" + usag + "\n" + perm + "\n" + cd)
      .setFooter(
        "Legacy Games bot - Created by Alessandro#6904",
        "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
      )
      .setAuthor(
        "Message sent for " + message.author.username,
        message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setTimestamp()
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
      );

    message.channel.send(emb);
  }
};

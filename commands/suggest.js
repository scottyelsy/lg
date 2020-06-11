const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "suggest",
  description: "submits a suggestion",
  aliases: [""],
  permissions: "Everyone",
  usage: "",
  cooldown: 3,
  async execute(message, args) {
    const sembed = new Discord.MessageEmbed()
      .setTitle("__Submit a suggestion__")
      .setColor("BLUE")
      .setFooter(
        "Legacy Games bot - Created by Alessandro#6904",
        "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
      )
      .setTimestamp()
      .setAuthor(
        "Message sent for " + message.author.username,
        message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setDescription(
        "**Please react with the category of the suggestion**\n \n🛠️- In-game suggestions\n💻 - Discord server suggestions\n🤖 - Bot suggestions\n\n❌ ** - Cancel**"
      );

    const segembed = new Discord.MessageEmbed()
      .setTitle("__Submit a suggestion__")
      .setColor("BLUE")
      .setFooter(
        "Legacy Games bot - Created by Alessandro#6904",
        "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
      )
      .setTimestamp()
      .setDescription(
        "**Please type your suggesion below**\n\nThis prompt times out in 5 minutes."
      );

    let Author = message.author;
    let Authorid = Author.id;
    const suggestionsChannel = message.guild.channels.cache.find(
      channel => channel.name === "suggestions"
    );
    const cfilter = response => {
      return response.author.id === Authorid;
    };

    const msg = message.channel.send(sembed).then(newMessage => {
      newMessage.react("🛠️");
      newMessage.react("💻");
      newMessage.react("🤖");
      newMessage.react("❌");

      const filter = (reaction, user) => {
        return (
          ["🛠️", "💻", "🤖", "❌"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      newMessage
        .awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "🛠️") {
            message.reply(segembed);

            message.channel
              .awaitMessages(cfilter, { max: 1, time: 300000 })
              .then(collected => {
                const igresponse = collected.first();
                let igsug = igresponse.content;

                const sugembed = new Discord.MessageEmbed()
                  .setTitle("__New suggestion!__")
                  .setColor("PINK")
                  .setDescription(igsug)
                  .setFooter(
                    "Legacy Games bot - Created by Alessandro#6904",
                    "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
                  )
                  .setTimestamp()
                  .addField("Suggested by:", message.author, true)
                  .addField("Category", "In-game", true);

                message.channel.send("Suggestion Submitted!");
                message.guild.channels.cache
                  .get("720379403552423967")
                  .send(sugembed)
                  .then(newMessage => {
                    newMessage.react("720607669722939453");
                    newMessage.react("720608875463573576");
                    newMessage.react("720608900575002674");
                  });
              });
          } else if (reaction.emoji.name === "💻") {
            message.reply(segembed);

            message.channel
              .awaitMessages(cfilter, { max: 1, time: 300000 })
              .then(collected => {
                const igresponse = collected.first();
                let igsug = igresponse.content;

                const sugembed = new Discord.MessageEmbed()
                  .setTitle("__New suggestion!__")
                  .setColor("PINK")
                  .setDescription(igsug)
                  .setFooter(
                    "Legacy Games bot - Created by Alessandro#6904",
                    "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
                  )
                  .setTimestamp()
                  .addField("Suggested by:", message.author, true)
                  .addField("Category", "Discord Server", true);

                message.channel.send("Suggestion Submitted!");
                message.guild.channels.cache
                  .get("720379403552423967")
                  .send(sugembed)
                  .then(newMessage => {
                    newMessage.react("720607669722939453");
                    newMessage.react("720608875463573576");
                    newMessage.react("720608900575002674");
                  });
              });
          } else if (reaction.emoji.name === "🤖") {
            message.reply(segembed);

            message.channel
              .awaitMessages(cfilter, { max: 1, time: 300000 })
              .then(collected => {
                const igresponse = collected.first();
                let igsug = igresponse.content;

                const sugembed = new Discord.MessageEmbed()
                  .setTitle("__New suggestion!__")
                  .setColor("PINK")
                  .setDescription(igsug)
                  .setFooter(
                    "Legacy Games bot - Created by Alessandro#6904",
                    "https://cdn.discordapp.com/attachments/712357338971111497/714882817368260738/eeeee.png"
                  )
                  .setTimestamp()
                  .addField("Suggested by:", message.author, true)
                  .addField("Category", "Bot", true);

                message.channel.send("Suggestion Submitted!");
                message.guild.channels.cache
                  .get("720379403552423967")
                  .send(sugembed)
                  .then(newMessage => {
                    newMessage.react("720607669722939453");
                    newMessage.react("720608875463573576");
                    newMessage.react("720608900575002674");
                  });
              });
          } else if (reaction.emoji.name === "❌") {
            message.reply("Prompt cancelled");
            newMessage.delete();
          } else {
            message.reply("Error");
          }
        })
        .catch(collected => {
          console.log(
            `After a minute, only ${collected.size} out of 4 reacted.`
          );
          message.reply("Prompt cancelled");
        });

      const collector = new Discord.MessageCollector(
        message.channel,
        m => m.author.id === message.author.id,
        { time: 30000 }
      );
    });
  }
};

module.exports = {
  name: "ping",
  description: "Get the Bot's ping",
  aliases: [],
  permissions: "Everyone",
  usage: "",
  cooldown: 2,
  execute(message, args) {
    var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.send(
      ":ping_pong: Ping - `" +
        `${Date.now() - message.createdTimestamp}` +
        " ms`"
    );
  }
};

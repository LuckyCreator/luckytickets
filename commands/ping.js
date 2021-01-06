const discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.reply(`📈 Average ping to API: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);

}

module.exports.help = {
    name: "ping",
}

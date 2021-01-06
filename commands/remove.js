const discord = require("discord.js");

module.exports.run = async(bot, msg, args) => {

    const arguments = msg.mentions.users.first();

    const c = msg.channel

    c.updateOverwrite(arguments.id, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
    })
    msg.channel.send("Member <@" + arguments + "> has been removed from your ticket.")

}

module.exports.help = {
    name: "remove"
}
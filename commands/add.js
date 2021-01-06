const discord = require("discord.js");

module.exports.run = async(bot, msg, args) => {

    const arguments = msg.mentions.users.first();

    const c = msg.channel

    c.updateOverwrite(arguments.id, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
    })
    msg.channel.send("Member <@" + arguments + "> has been added to your ticket.")

}

module.exports.help = {
    name: "add"
}
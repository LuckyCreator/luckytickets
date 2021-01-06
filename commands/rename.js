const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.channel.parent) return message.channel.send("This is not a ticket.");
	if (message.channel.parent.name != "Tickets") return message.channel.send("Do this in a ticket channel..");

    var naam = args.join(` `)
    if(!naam) return message.reply("You need to enter a channel name");

    message.channel.setName("『🔧』" + naam.replace(' ', '-'))
    message.channel.send('Channelname is changed to:** ' + naam + '**');

}

module.exports.help = {
    name: "rename"
}
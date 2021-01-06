//(👥) 𝓢𝓾𝓹𝓹𝓸𝓻𝓽-𝓣𝓮𝓪𝓶

const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.roles.cache.find((r) => r.name == "Support-Team")) {
		embed = new discord.MessageEmbed().setTitle("Sorry, you are not allowed to do this.").setColor("FFB902");
		message.channel.send(embed);
		return;
	}

    let embed = new discord.MessageEmbed()
        .setTitle(`:tickets: | Create Tickets`)
        .setDescription ("React to open a ticket!\n\n:question: | Questions\n :handshake: | Partnerships\n :file_folder: | Apply\n 🛠 | Complaints").setColor("#FFB902")
    message.channel.send(embed).then((message) => {
        message.react("❓")
        message.react("🤝")
        message.react("📁")
        message.react("🛠")
    }); 

}

module.exports.help = {
    name: "ticketReact"
}
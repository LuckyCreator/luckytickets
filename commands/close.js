const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {

	let time = 10e3;

    if (!message.member.roles.cache.find((r) => r.name == "Support-Team")) {
		embed = new discord.MessageEmbed().setTitle("Sorry, you are not allowed to do this.").setColor("FFB902");
		message.channel.send(embed);
		return;
	}

	const CloseEmbed = new discord.MessageEmbed().setTitle("Ticket Closed").setDescription(`**Ticket Naam:**\n${message.channel.name}\n\n**Closed by:**\n${message.author}\n\n**Server:**\n${message.guild.name}`).setColor("FFB902");

	const ticketLog = message.member.guild.channels.cache.find((channel) => channel.name === "『🔐』log");

	if (!message.channel.parent) return message.channel.send("This is not a ticket.");
	if (message.channel.parent.name != "Tickets") return message.channel.send("Do this in a ticket channel..");

	await message.channel.send(`This ticket closes in **${time / 1e3}** seconds. Type **cancel** to stop the process.`);
	let collector = message.channel.createMessageCollector((m) => m.content.toLowerCase().includes("cancel") || m.content.toLowerCase().includes("cancel"), {time: time, max: 1});
	collector.on("end", (collected) => {
		if (collected.size < 1) {
			let write = fs.createWriteStream(`./Transcripts/${message.channel.name}.txt`);
			message.channel.messages.fetch({limit: 100}).then((messages) => {
				messages2 = messages;
				messages2.forEach((msg) => {
					write.write(`${msg.author.tag}: ${msg.content}\n\r`);
				});
				write.end();
				ticketLog.send("**Transcript:** ", {files: [`./Transcripts/${message.channel.name}.txt`]}).then(() => message.channel.delete());
                ticketLog.send(CloseEmbed);
                
			});
		}
		message.channel.send("The closing of this ticket has been **canceled.**");
	});
};

module.exports.help = {
    name: "close"
}
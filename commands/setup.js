const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var supportId = message.guild.roles.cache.find((r) => r.name == "Support-Team").id;

    var guild = bot.guilds.cache.get(message.guild.id);

    guild.roles.create({
        data: {
          name: 'Support-Team',
          color: 'YELLOW',
        },
        reason: `Support-Team role for ${message.guild.name}`,
      })
        .then(console.log)
        .catch(console.error);
    message.channel.send(`The role <@&` + supportId + `> is created and you can add it to yourself and other staffmembers.`)

    guild.channels.create('Tickets', {
        type: 'category',
        permissionsOverwrites: [{
          id: guild.id,
          deny: ['MANAGE_MESSAGES'],
          allow: ['SEND_MESSAGES']
        }]
      })
        .then(console.log)
        .catch(console.error)
        .then(msg => {
            guild.channels.create("『🔐』log", {
                type: "text",
                parent: message.guild.channels.cache.find((c) => c.name == "Tickets"),
                permissionOverwrites: [{
                        id: message.member.guild.roles.cache.find((r) => r.name == "Support-Team"),
                        allow: ["VIEW_CHANNEL"],
                    },
                    {
                        id: message.member.guild.roles.cache.find((r) => r.name == "@everyone"),
                        deny: ["VIEW_CHANNEL"],
                    }
                ],
            });
            message.channel.send(`The channel **『🔐』log** has been created.`)
        });
    message.channel.send("The category **Tickets** is created.")

}

module.exports.help = {
    name: "setup"
}
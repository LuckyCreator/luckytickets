const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0) {
        console.log("Geen files gevonden...");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen.`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.login(process.env.TOKEN);

client.on("message", async (message) => {

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client,message, args);

});

client.on("messageReactionAdd", async(reaction, member) => {
    if (member.bot) return;
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.message.channel.partial) await reaction.message.channel.fetch();
    if (!reaction.message.embeds[0]) return;
    if (!reaction.message.author.id === client.id) return;

    if (reaction.message.embeds[0].title == `:tickets: | Create Tickets`) {
        if (reaction.emoji.name == "❓") {
            openTicketReactionB(member, "ticket", reaction);
        }
        if (reaction.emoji.name == "🤝") {
            openTicketReactionC(member, "ticket", reaction);
        }
        if (reaction.emoji.name == "📁") {
            openTicketReactionD(member, "ticket", reaction);
        }
        if (reaction.emoji.name == "🛠") {
            openTicketReactionE(member, "ticket", reaction);
        }
    }
});

async function openTicketReactionB(member, topic, reaction) {
    reaction.users.remove(member.id);
    if(reaction.message.guild.channels.cache.find(channel => channel.name === `『❓』${member.username.toLowerCase().replace(" ", "-")}`)) {
        return reaction.message.channel.send("Sorry, you already have a ticket in this category.").then((message) => {
            setTimeout(function() {
                message.delete();
            }, 5000);
        });
    }
    reaction.message.guild.channels
        .create("『❓』" + member.username, {
            type: "text",
            parent: reaction.message.guild.channels.cache.find((c) => c.name == "Tickets"),
            permissionOverwrites: [{
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "Support-Team"),
                    allow: ["VIEW_CHANNEL"],
                },
                {
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "@everyone"),
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: member.id,
                    allow: ["VIEW_CHANNEL"],
                }
            ],
        })
        .catch()
        .then((ticket_channel) => {
            var embedMessage = new discord.MessageEmbed().setColor("FFB902").setDescription("I've created a ticket for you!");
            reaction.message.channel.send(embedMessage).then((message) => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            });

            var botAvatar = client.user.displayAvatarURL();
            var avatar = member.displayAvatarURL();
            var embedMessage = new discord.MessageEmbed()
                .setColor("#FFB902")
                .setTitle("**Ticket**")
                .setDescription("You have created a ticket!\nA staff member will come as soon as possible.")
                .setFooter("Ticket from " + member.tag + ". • 🎫 | Tickets", avatar);
            ticket_channel.send(`<@${member.id}>, <@&${reaction.message.guild.roles.cache.find((r) => r.name == "Support-Team").id}>.`);
            ticket_channel.send(embedMessage);
        })
        .catch();
}
2

async function openTicketReactionC(member, topic, reaction) {
    reaction.users.remove(member.id);
    if(reaction.message.guild.channels.cache.find(channel => channel.name === `『🤝』${member.username.toLowerCase().replace(" ", "-")}`)) {
        return reaction.message.channel.send("Sorry, you already have a ticket in this category.").then((message) => {
            setTimeout(function() {
                message.delete();
            }, 5000);
        });
    }
    reaction.message.guild.channels
        .create("『🤝』" + member.username, {
            type: "text",
            parent: reaction.message.guild.channels.cache.find((c) => c.name == "Tickets"),
            permissionOverwrites: [{
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "Support-Team"),
                    allow: ["VIEW_CHANNEL"],
                },
                {
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "@everyone"),
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: member.id,
                    allow: ["VIEW_CHANNEL"],
                }
            ],
        })
        .catch()
        .then((ticket_channel) => {
            var embedMessage = new discord.MessageEmbed().setColor("FFB902").setDescription("I've created a ticket for you!");
            reaction.message.channel.send(embedMessage).then((message) => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            });

            var botAvatar = client.user.displayAvatarURL();
            var avatar = member.displayAvatarURL();
            var embedMessage = new discord.MessageEmbed()
                .setColor("#FFB902")
                .setTitle("**Ticket**")
                .setDescription("You have created a ticket!\nA staff member will come as soon as possible.")
                .setFooter("Ticket from " + member.tag + ". • 🎫 | Tickets", avatar);
            ticket_channel.send(`<@${member.id}>, <@&${reaction.message.guild.roles.cache.find((r) => r.name == "Support-Team").id}>.`);
            ticket_channel.send(embedMessage);
        })
        .catch();
}
2

async function openTicketReactionD(member, topic, reaction) {
    reaction.users.remove(member.id);
    if(reaction.message.guild.channels.cache.find(channel => channel.name === `『📁』${member.username.toLowerCase().replace(" ", "-")}`)) {
        return reaction.message.channel.send("Sorry, you already have a ticket in this category.").then((message) => {
            setTimeout(function() {
                message.delete();
            }, 5000);
        });
    }
    reaction.message.guild.channels
        .create("『📁』" + member.username, {
            type: "text",
            parent: reaction.message.guild.channels.cache.find((c) => c.name == "Tickets"),
            permissionOverwrites: [{
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "🛠 ➨ Support-Team"),
                    allow: ["VIEW_CHANNEL"],
                },
                {
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "@everyone"),
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: member.id,
                    allow: ["VIEW_CHANNEL"],
                }
            ],
        })
        .catch()
        .then((ticket_channel) => {
            var embedMessage = new discord.MessageEmbed().setColor("FFB902").setDescription("I've created a ticket for you!");
            reaction.message.channel.send(embedMessage).then((message) => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            });

            var botAvatar = client.user.displayAvatarURL();
            var avatar = member.displayAvatarURL();
            var embedMessage = new discord.MessageEmbed()
                .setColor("#FFB902")
                .setTitle("**Ticket**")
                .setDescription("You have created a ticket!\nA staff member will come as soon as possible.")
                .setFooter("Ticket from " + member.tag + ". • 🎫 | Tickets", avatar);
            ticket_channel.send(`<@${member.id}>, <@&${reaction.message.guild.roles.cache.find((r) => r.name == "Support-Team").id}>.`);
            ticket_channel.send(embedMessage);
        })
        .catch();
}
2

async function openTicketReactionE(member, topic, reaction) {
    reaction.users.remove(member.id);
    if(reaction.message.guild.channels.cache.find(channel => channel.name === `『🛠』${member.username.toLowerCase().replace(" ", "-")}`)) {
        return reaction.message.channel.send("Sorry, you already have a ticket in this category.").then((message) => {
            setTimeout(function() {
                message.delete();
            }, 5000);
        });
    }
    reaction.message.guild.channels
        .create("『🛠』" + member.username, {
            type: "text",
            parent: reaction.message.guild.channels.cache.find((c) => c.name == "Tickets"),
            permissionOverwrites: [{
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "🛠 ➨ Support-Team"),
                    allow: ["VIEW_CHANNEL"],
                },
                {
                    id: reaction.message.member.guild.roles.cache.find((r) => r.name == "@everyone"),
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: member.id,
                    allow: ["VIEW_CHANNEL"],
                }
            ],
        })
        .catch()
        .then((ticket_channel) => {
            var embedMessage = new discord.MessageEmbed().setColor("FFB902").setDescription("I've created a ticket for you!");
            reaction.message.channel.send(embedMessage).then((message) => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            });

            var botAvatar = client.user.displayAvatarURL();
            var avatar = member.displayAvatarURL();
            var embedMessage = new discord.MessageEmbed()
                .setColor("#FFB902")
                .setTitle("**Ticket**")
                .setDescription("You have created a ticket!\nA staff member will come as soon as possible.")
                .setFooter("Ticket from " + member.tag + ". • 🎫 | Tickets", avatar);
            ticket_channel.send(`<@${member.id}>, <@&${reaction.message.guild.roles.cache.find((r) => r.name == "Support-Team").id}>.`);
            ticket_channel.send(embedMessage);
        })
        .catch();
}
2

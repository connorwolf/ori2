const fs = require("fs"),
	Discord = require("discord.js");

const CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed"),
	Application = require("../models/ApplicationModel").Application;

function sendToChannel(b, m, temp, ans) {
	let g = b.client.guilds.get(m.guild.id);
	if (!g) return Error();
    
	let ch = g.channels.find("name", "applications");
	let embed = new NexusEmbed()
		.setTitle(`Application by ${m.author.tag}`)
		.addField("Questions", temp.join("\n\n"))
		.addField("Answer", ans);
	ch.send({ embed }).then((msg) => {
		msg.react("✅");
		msg.react("❎");
        
		let filter = (r) => r.emoji == "✅" || r.emoji == "❎";
		let collector = new Discord.ReactionCollector(msg, filter);
		collector.on("collect", (r) => {
			msg.delete();
			var sfe;
			var mb;
			switch(r.emoji.name) {
			case "✅": 
				switch(m.guild.id) {
				case "414394912138592267":
					sfe = b.client.guilds.get("360462032811851777");
					mb = sfe.members.get(m.author.id);
					mb.addRole("Partnership Team").catch(() => {});
					m.author.send(":white_check_mark: Your application has been accepted.");
					break;
				}
				break;
			default:
				return;
			case "❎":
				switch(m.guild.id) {
				case "414394912138592267":
					sfe = b.client.guilds.get("360462032811851777");
					mb = sfe.members.get(m.author.id);
					mb.addRole("Partnership Team").catch(() => {});
					break;
				default:
					return;
				}
			}
		});
	});
}

const apply = new CommandUtil.Command(
	{
		name: "apply",
		description: "Apply for a server",
		global: false,
		permission: new CommandUtil.CommandPermission(0),
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m) {
		if (!fs.existsSync(`${__dirname}/templates/${m.guild.id}.json`))
			return m.reply(
				`:no_entry: The server \`${m.guild.name}\`, ID: \`${
					m.guild.id
				}\` does not accept SFN sub team applications.`
			);
		Application.findOne({ userId: m.author.id }, (err, res) => {
			if (err) return m.reply(":no_entry: Could not complete your request.");
			if (m.member.roles.find("name", "Applicants") || res)
				return m.reply(
					`:no_entry: You have already applied for the server \`${
						m.guild.name
					}\`, ID: \`${m.guild.id}\`.`
				);
			m.author.createDM().then(
				(ch) => {
					let appArray = require(`./templates/${m.guild.id}.json`);
					ch.send(`Welcome to the Application Process for \`${m.guild.name}\`
Please answer all ${
	appArray.length
} questions below. If you do not wish to answer, reply with \`-\` 

${appArray.join("\n\n")}
`);
					let filter = (m) => m.author.id != b.client.user.id;
					let collector = ch.createMessageCollector(filter);
					collector.on("collect", (msg) => {
						if (m.cleanContent.length < 1) {
							return ch.send(":no_entry: Please enter an answer.");
						} else {
							ch.send(":white_check_mark: Your application has been submitted.");
							m.member.addRole("Applicants").catch(() => {});
							sendToChannel(b, m, appArray, msg.cleanContent);
						}
					});
				},
				() => {
					m.reply(
						":no_entry: Could not create DM channel. Make sure you can accept DMs from all users."
					);
				}
			);
		});
	}
);

module.exports = apply;

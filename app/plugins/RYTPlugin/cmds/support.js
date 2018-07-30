const Discord = require("discord.js");

const CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed");

const Report = require("../models/ReportModel").Report;

const support = new CommandUtil.Command(
	{
		name: "support",
		description: "Support command for RYT",
		global: true,
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m, a) {
		let smsg = a.join(" ");
		if (smsg.length < 1) {
			return m.reply(
				":negative_squared_cross_mark: Your request did not contain any content!"
			);
		}

		let report = new Report({
			sid: Discord.SnowflakeUtil.generate(),
			msg: smsg,
			userID: m.author.id,
			submittedAt: new Date()
		});

		report.save();

		let embed = new NexusEmbed()
			.setTitle("Support Request")
			.setDescription(`Request from <@${m.author.id}>: \`\`\`${smsg}\`\`\``)
			.addField("Report ID", report.sid)
			.addField("Subbmitted At", new Date());

		m.guild.channels.get("472884845597687819").send({ embed });
		m.reply(`:white_check_mark: Your request has been submitted, reference \`${report.sid}\``);
	}
);

module.exports = support;

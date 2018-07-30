const CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed"),
	Util = require("../../../lib/Util");

const Report = require("../models/ReportModel").Report;

const sget = new CommandUtil.Command(
	{
		name: "sget",
		description: "Get a support request",
		global: true,
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m, a) {
		if (a.length < 1) {
			let embed = new NexusEmbed().setTitle("Report List");

			Report.find((err, res) => {
				if (err) Util.log("SGET", "ERROR", err);

				let rs = [];

				res.map((r) => {
					rs.push(`\`${r.sid}\` | <@${r.userID}> | ${r.submittedAt}`);
				});

				embed.setDescription(`
Here is a list of all report (ID | User | Submitted At):

${rs.join("\n") || "`No reports found`"}

For more information on a specific report, type \`!sget <reportID>\`
`);
				m.channel.send({ embed });
			});
		} else {
			Report.findOne({ sid: a[0] }, (err, res) => {
				if (err) Util.log("SGET", "ERROR", err);
				if (!res)
					return m.reply(
						`:negative_squared_cross_mark: A report ID \`${a[0]}\` was not found.`
					);
				let embed = new NexusEmbed()
					.setTitle("Support Request")
					.setDescription(`Request from <@${res.userID}>: \`\`\`${res.msg}\`\`\``)
					.addField("Report ID", res.sid)
					.addField("Subbmitted At", res.submittedAt);

				m.channel.send({ embed });
			});
		}
	}
);

module.exports = sget;

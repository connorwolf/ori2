const Util = require("../../../lib/Util"),
	CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed");

const Report = require("../models/ReportModel").Report;

const sreply = new CommandUtil.Command(
	{
		name: "sreply",
		description: "Reply to support command for RYT",
		global: true,
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m, a) {
		if (a.length < 1) {
			return m.reply(
				":negative_squared_cross_mark: Please specify the ID of the report to reply to"
			);
		}
		if (!a[1]) {
			return m.reply(":negative_squared_cross_mark: Your reply did not contain any content!");
		} else {
			let id = a.shift();
			let msg = a.join(" ");
			Report.findOne({ sid: id, guildID: m.guild.id }, (err, res) => {
				if (err) Util.log("SGET", "ERROR", err);
				if (!res)
					return m.reply(
						`:negative_squared_cross_mark: A report ID \`${a[0]}\` was not found.`
					);

				if (!b.client.users.get(res.userID))
					return m.reply(
						`:negative_squared_cross_mark: Cannot access the user \`${res.userID}\``
					);
				let user = b.client.users.get(res.userID);
				user.createDM().then(
					(ch) => {
						let embed = new NexusEmbed()
							.setTitle("Support Request")
							.setDescription(`Your request in "${m.guild.name}" has been answered.`)
							.addField("Your Request", `\`\`\`${res.msg}\`\`\``)
							.addField("Response", `\`\`\`${msg}\`\`\``)
							.addField("Report ID", res.sid, true)
							.addField("Subbmitted At", res.submittedAt, true);

						ch.send({ embed });
						Report.deleteOne({ sid: id, guildID: m.guild.id }, (err) => {
							if (err)
								m.reply(
									`:negative_squared_cross_mark: There was an error whilst deleting the report entry (ID: \`${id}\``
								);
							return m.reply(
								`:white_check_mark: Successfully replied to, and deleted report ID \`${id}\``
							);
						});
					},
					() => {
						return m.reply(
							`:negative_squared_cross_mark: Could not send a message to the user ID \`${
								res.userID
							}\``
						);
					}
				);
			});
		}
	}
);

module.exports = sreply;

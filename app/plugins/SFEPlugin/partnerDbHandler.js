const EventHandler = require("../../lib/EventHandler"),
	Partnership = require("./models/PartnershipModel").Partnership,
	Util = require("../../lib/Util");

module.exports = function(b) {
	let handler = b.eventHandlers.get("message");
	handler.addHandler(
		new EventHandler.SubHandler(handler, "sfe_partner", (b, m) => {
			if (m.guild.id != "360462032811851777" && !m.cleanContent.startsWith("+")) return;

			let args = m.content
				.slice(1)
				.trim()
				.split(/ +/g);
			if (args.length < 1) return;
			let cmd = String(args.shift()).toLowerCase();

			if (cmd != "partner") return;

			if (!m.member.roles.find("name", "Partnership Team")) return;

			b.client.fetchInvite(args.shift()).then((invite) => {
				Partnership.findOne({ guildId: invite.guild.id }, (err, res) => {
					if (err) return Util.log("SFE", "ERROR", err);
					if (!res) {
						let p = new Partnership({
							guildId: invite.guild.id,
							userId: m.author.id,
							userTag: m.author.tag,
							invite: invite.url,
							description: args.join(" "),
							partneredAt: new Date()
						});
						p.save();
					} else {
						m.reply(`:warning: **Heads up!**

The guild \`${invite.guild.name}\`, ID: \`${
	invite.guild.id
}\` appears to have already been partnered by **${res.userTag}**.
You might want to check with the guild to see if this is ok. Or not - you might be able to get away with it ;)

Last Partnered: \`${res.partneredAt}\`
`);

						Partnership.findOneAndUpdate(
							{ guildId: invite.guild.id },
							{
								$set: {
									guildId: invite.guild.id,
									userId: m.author.id,
									userTag: m.author.tag,
									invite: invite.url,
									description: args.join(" "),
									partneredAt: new Date()
								}
							},
							(err, doc, res) => {
								if (err || !doc || res) throw Error("could not update document.");
							}
						);
					}
				});
			});
		})
	);
};

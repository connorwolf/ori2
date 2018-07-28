const CommandUtil = require("../../lib/CommandUtil"),
	Util = require("../../lib/Util");

const verify = new CommandUtil.Command(
	{
		name: "verify",
		description: "verify command for Nibel",
		global: true,
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m) {
		if (m.channel.id != "") return;
		m.member.addRole("• Member").then(() => {
			m.guild.channels.get();
		}, (err) => {
			Util.log(err);
		});
	}
);

module.exports = verify;
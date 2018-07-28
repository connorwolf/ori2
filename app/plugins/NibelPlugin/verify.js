import { Command, CommandSyntax } from "../../lib/CommandHandler";

const plugins = new Command(
	{
		name: "verify",
		description: "verify command for Nibel",
		global: true,
		syntax: new CommandSyntax("")
	},
	async function(b, m) {
		if (m.channel.id != "") return;
		m.member.addRole("• Member").then(() => {
			m.guild.channels.get();
		});
	}
);

export default plugins;

import { Command, CommandSyntax } from "../../lib/CommandHandler";
import { NexusEmbed } from "../../lib/NexusEmbed";

const plugins = new Command(
	{
		name: "plugins",
		description: "Retrieves information about various plugins enabled.",
		global: true,
		syntax: new CommandSyntax("")
	},
	async function(b, m) {
		let temp = [];
		b.PluginManager.plugins.forEach((pl) => {
			temp.push(pl.name);
		});

		let embed = new NexusEmbed()
			.setTitle("Plugins")
			.setDescription(`Here is a list of plugins enabled:\n\n\`${temp.join("`, `")}\``);

		m.channel.send({ embed });
	}
);

export default plugins;

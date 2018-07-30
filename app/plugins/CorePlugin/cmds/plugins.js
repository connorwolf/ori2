const CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed");

const plugins = new CommandUtil.Command(
	{
		name: "plugins",
		description: "Retrieves information about various plugins enabled.",
		global: true,
		permission: new CommandUtil.CommandPermission(2),
		syntax: new CommandUtil.CommandSyntax("")
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

module.exports = plugins;
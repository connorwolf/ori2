import { Command, CommandSyntax } from "../../lib/CommandHandler";
import { NexusEmbed } from "../../lib/NexusEmbed";

const plugins = new Command(
	{
		name: "test",
		description: "Test command for Nibel",
		global: true,
		syntax: new CommandSyntax("")
	},
	async function(b, m) {
		let commands;

		let commandObj = b.CommandHandler.guildCommands.get(m.guild.id);
		if (!commandObj) commands = "None";
		else commands = Object.keys(commandObj).join("`,`");

		let embed = new NexusEmbed()
			.setTitle("Per-guild Commands")
			.setDescription("Per-guild commands are currently functional")
			.addField("Guild Name", m.guild.name, true)
			.addField("Guild ID", m.guild.id, true)
			.addField("Guild Member Count", m.guild.memberCount, true)
			.addField("Guild Commands", `\`${commands}\``);

		m.channel.send({ embed });
	}
);

export default plugins;

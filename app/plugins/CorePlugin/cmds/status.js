const CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed"),
	Util = require("../../../lib/Util");

function format(seconds) {
	function pad(s) {
		return (s < 10 ? "0" : "") + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor((seconds % (60 * 60)) / 60);
	seconds = Math.floor(seconds % 60);

	return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

const status = new CommandUtil.Command(
	{
		name: "status",
		description: "Returns the bot's status",
		global: true,
		permission: new CommandUtil.CommandPermission(0),
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m) {
		let embed = new NexusEmbed().setTitle("Bot Status").setThumbnail(b.client.user.avatarURL)
			.setDescription(`
Here's a list of various statuses I found lying around...

Version: \`v${Util.package.version}\`
Ping: \`${Math.round(b.client.ping)}ms\`
Response Time: \`${(Math.round(Date.now() - m.createdTimestamp))}ms\`
Uptime: \`${format(process.uptime())}\`
Loaded Plugins: \`${b.PluginManager.plugins.size}\`
Registered Commands: \`${b.CommandHandler.globalCommands.size}\`

DM <@210118905006522369> for more info on what these mean.
                `);
		m.channel.send({ embed });
	}
);

module.exports = status;
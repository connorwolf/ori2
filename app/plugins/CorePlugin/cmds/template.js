const CommandUtil = require("../../../lib/CommandUtil"),
	NexusEmbed = require("../../../lib/NexusEmbed"),
	Util = require("../../../lib/Util");

const status = new CommandUtil.Command(
	{
		name: "",
		description: "",
		global: true,
		permission: new CommandUtil.CommandPermission(0),
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function (b, m) {
       
	}
);

module.exports = status;
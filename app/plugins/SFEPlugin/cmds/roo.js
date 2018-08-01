const util = require("util");
const CommandUtil = require("../../../lib/CommandUtil");

const hasUsed = new Map();

const roo = new CommandUtil.Command(
	{
		name: "roo",
		description: ";)",
		global: true,
		permission: new CommandUtil.CommandPermission(0),
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function (b, m, a) {
		if (!hasUsed.get(m.author.id)) {
			m.channel.send(`:loudspeaker: ***__ROOHORN__*** <@224076574096490496> \`${a
				.join(" ")
				.replace(/[^a-zA-Z ]/g, "")}\`
:loudspeaker: ***__ROOHORN__*** <@224076574096490496> \`${a
		.join(" ")
		.replace(/[^a-zA-Z ]/g, "")}\`
:loudspeaker: ***__ROOHORN__*** <@224076574096490496> \`${a
		.join(" ")
		.replace(/[^a-zA-Z ]/g, "")}\`
            `);
			hasUsed.set(m.author.id, true);
			setTimeout(() => hasUsed.set(m.author.id, false), 60e3);
		} else {
			m.reply(":no_entry: You cannot use this command again yet!");
		}
	}
);

module.exports = roo;
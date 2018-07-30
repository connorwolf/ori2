const CommandUtil = require("../../../lib/CommandUtil");

const prefix = new CommandUtil.Command(
	{
		name: "prefix",
		description: "Sets the bot's prefix",
		global: true,
		permission: new CommandUtil.CommandPermission(1),
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function (b, m, a) {
		if (a.length < 1) {
			return m.reply(":negative_squared_cross_mark: Please provide a prefix to change to.");
		}
		let g = b.cache.get(m.guild.id);
		let oldprefix = g.options.prefix;
		g.options.prefix = a[0];
        
		b.cache.set(g.gid, g);
        
		return m.reply(`:white_check_mark: Changed prefix from \`${oldprefix}\` to \`${g.options.prefix}\`.`);
	}
);

module.exports = prefix;
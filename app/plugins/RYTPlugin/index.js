const BasePlugin = require("../BasePlugin"),
	Util = require("../../lib/Util");

const support = require("./cmds/support"),
	sget = require("./cmds/sget"),
	sdel = require("./cmds/sdel"),
	sreply = require("./cmds/sreply");

const clearCmds = require("./mdl/clearCmds");

class RYTPlugin extends BasePlugin {
	constructor(bot) {
		super();
		this.options = {
			name: "RYT"
		};
		this.name = "RYT";
		this.bot = bot;
	}

	start() {
		this.registerComands();
		clearCmds(this.bot.client);
		setInterval(() => clearCmds(this.bot.client), 900e3);
	}

	registerComands() {
		Util.log("RYT", "registering commands...");

		let rcd = this.bot.client.guilds.get("391941909335244801");
		if (!rcd) return;
		this.bot.CommandHandler.registerCommand(rcd, support);
		this.bot.CommandHandler.registerCommand(rcd, sget);
		this.bot.CommandHandler.registerCommand(rcd, sdel);
		this.bot.CommandHandler.registerCommand(rcd, sreply);
	}
}

module.exports = RYTPlugin;

const BasePlugin = require("../BasePlugin"),
	Util = require("../../lib/Util");

const test = require("./test");

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
	}

	registerComands() {
		Util.log("RYT", "registering commands...");

		let rcd = this.bot.client.guilds.get("");
		if (!rcd) return;
		this.bot.CommandHandler.registerCommand(rcd, test);
	}
}

module.exports = RYTPlugin;
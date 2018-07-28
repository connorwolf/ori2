const BasePlugin = require("../BasePlugin"),
	Util = require("../../lib/Util");

const test = require("./test");

class NibelPlugin extends BasePlugin {
	constructor(bot) {
		super();
		this.options = {
			name: "nibel"
		};
		this.name = "nibel";
		this.bot = bot;
	}

	start() {
		this.registerComands();
	}

	registerComands() {
		Util.log("CORE", "registering commands...");

		let nibel = this.bot.client.guilds.get("381561481361096705");
		if (!nibel) return;
		this.bot.CommandHandler.registerCommand(nibel, test);
	}
}

module.exports = NibelPlugin;
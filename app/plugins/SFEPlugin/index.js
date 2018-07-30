const BasePlugin = require("../BasePlugin"),
	Util = require("../../lib/Util"),
	EventHandler = require("../../lib/EventHandler"),
	NexusEmbed = require("../../lib/NexusEmbed");

class SFEPlugin extends BasePlugin {
	constructor(bot) {
		super();
		this.options = {
			name: "SFE"
		};
		this.name = "SFE";
		this.bot = bot;
	}

	start() {
		this.registerComands();
	}

	registerComands() {
		Util.log("SFE", "registering commands...");

		let sfe = this.bot.client.guilds.get("360462032811851777");
		if (!sfe) return;
		
	}
}

module.exports = SFEPlugin;

const Util = require("../../lib/Util"),
	BasePlugin = require("../BasePlugin"),
	Presence = require("../Presence");

const status = require("./status"),
	plugins = require("./plugins"),
	NibelPlugin = require("../NibelPlugin");

class CorePlugin extends BasePlugin {
	constructor(bot) {
		super();
		this.options = {
			name: "core"
		};
		this.name = "core";
		this.bot = bot;
	}

	start() {
		this.bot.PluginManager.loadPlugin(new Presence(this.bot));
		this.bot.PluginManager.loadPlugin(new NibelPlugin(this.bot));
		this.registerComands();
	}

	registerComands() {
		Util.log("CORE", "registering commands...");
		this.bot.CommandHandler.registerGlobalCommand(status);
		this.bot.CommandHandler.registerGlobalCommand(plugins);
	}
}

module.exports = CorePlugin;
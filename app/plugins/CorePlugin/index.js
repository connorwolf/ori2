const Util = require("../../lib/Util"),
	BasePlugin = require("../BasePlugin"),
	Presence = require("../Presence");

const status = require("./status"),
	plugins = require("./plugins"),
	info = require("./info");

const NibelPlugin = require("../NibelPlugin");

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
		this.bot.CommandHandler.registerGlobalCommand(info);
	}
}

module.exports = CorePlugin;
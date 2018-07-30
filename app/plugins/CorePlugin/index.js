const Util = require("../../lib/Util"),
	BasePlugin = require("../BasePlugin"),
	Presence = require("../Presence");

const status = require("./cmds/status"),
	plugins = require("./cmds/plugins"),
	info = require("./cmds/info"),
	clear = require("./cmds/clear"),
	prefix = require("./cmds/prefix"),
	crypt = require("./cmds/crypt");

const NibelPlugin = require("../NibelPlugin");
const RYTPlugin = require("../RYTPlugin");
const SFEPlugin = require("../SFEPlugin");

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
		this.bot.PluginManager.loadPlugin(new RYTPlugin(this.bot));
		this.bot.PluginManager.loadPlugin(new SFEPlugin(this.bot));
		this.registerComands();
	}

	registerComands() {
		Util.log("CORE", "registering commands...");
		this.bot.CommandHandler.registerGlobalCommand(status);
		this.bot.CommandHandler.registerGlobalCommand(plugins);
		this.bot.CommandHandler.registerGlobalCommand(info);
		this.bot.CommandHandler.registerGlobalCommand(clear);
		this.bot.CommandHandler.registerGlobalCommand(prefix);
		this.bot.CommandHandler.registerGlobalCommand(crypt);
	}
}

module.exports = CorePlugin;

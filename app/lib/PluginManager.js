const CorePlugin = require("../plugins/CorePlugin");

class PluginManager {
	constructor(bot) {
		this.bot = bot;
		this.plugins = new Map();
	}

	loadPlugin(plugin) {
		this.plugins.set(plugin.name, plugin);
		plugin.start();
	}

	unloadPlugin(pluginName) {
		let plugin_unload = this.plugins.get(pluginName);
		if (plugin_unload) {
			plugin_unload.unload();
		}
	}

	async loadCore() {
		let core = new CorePlugin(this.bot);
		this.plugins.set("core", core);
		core.start();
	}
}

module.exports = PluginManager;
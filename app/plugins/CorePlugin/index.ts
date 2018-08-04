import { BasePlugin, IPluginOptions } from "../BasePlugin";
import { KrystalClient } from "../../KrystalClient";

class CorePlugin extends BasePlugin {
	constructor(bot: KrystalClient, options: IPluginOptions) {
		super(bot, options);
		this.bot = bot;
	}

	start() {

	}

	registerCommands() {
	}
}

module.exports = CorePlugin;

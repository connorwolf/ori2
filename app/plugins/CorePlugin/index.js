import Util from "../../lib/Util";
import { BasePlugin } from "../BasePlugin";
import { Presence } from "../Presence";

import status from "./status";
import plugins from "./plugins";
import { NibelPlugin } from "../NibelPlugin";

export class CorePlugin extends BasePlugin {
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

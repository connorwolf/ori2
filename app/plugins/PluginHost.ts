import * as fs from "fs";
import { KrystalClient } from "../KrystalClient";
import { BasePlugin } from "./BasePlugin";

export class PluginHost {
	public bot: KrystalClient;
	public plugin: BasePlugin;
	private timeout: NodeJS.Timer;

	constructor(bot: KrystalClient, plugin: BasePlugin) {
		this.bot = bot;
		this.plugin = plugin;
		this.plugin.start();
		this.watch();
	}

	private watch() {
		fs.watch(`${__dirname}/${this.plugin.options.path}`, {
			persistent: true,
			recursive: true,
		}, (eventType: string, filename: string) => {
			if (eventType === "change") {
				if (this.timeout) { clearTimeout(this.timeout); }
				this.timeout = setTimeout(() => {
					this.bot.logger.info(`Changes to plugin "${this.plugin.options.name}", reloading...`);
					this.restartPlugin();
				}, 3e3);
			}
		});
	}
	private restartPlugin() {
		this.plugin.stop();
		this.plugin.unload();
		delete require.cache[require.resolve(`./${this.plugin.options.path}`)];

		import(`./${this.plugin.options.path}`)
			.then((Plugin) => {
				this.plugin = new Plugin.default(this.bot);
				this.plugin.start();
			}, (err) => {
				this.bot.logger.error(err);
			});
	}
}
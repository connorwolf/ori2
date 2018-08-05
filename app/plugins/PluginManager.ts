import { Collection } from "discord.js";
import { KrystalClient } from "../KrystalClient";
import { BasePlugin } from "./BasePlugin";
import { PluginHost } from "./PluginHost";

export class PluginManager {
	public bot: KrystalClient;
	public pluginHosts: Collection<string, PluginHost>;
	constructor(bot: KrystalClient) {
		this.bot = bot;
		this.pluginHosts = new Collection();
	}
	public spawn(plugin: BasePlugin) {
		this.bot.logger.debug(`Spawning plugin host for plugin "${plugin.options.name}"...`);
		this.pluginHosts.set(plugin.options.name, new PluginHost(this.bot, plugin));
	}
	public async load(plugin: BasePlugin) {
		this.bot.logger.info(`Loading plugin "${plugin.options.name}"...`);
		await plugin.start();
	}
	public async startConfiguredPlugins() {
		this.bot.logger.info("Spawning configured plugins...");
		this.bot.config.bot.plugins.map((path) => {
			import(`./${path}`)
				.then((Plugin) => {
					this.spawn(new Plugin.default(this.bot));
				}, (err) => {
					this.bot.logger.error(err);
				});
		});
	}
}
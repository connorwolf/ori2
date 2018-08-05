import { Collection } from "discord.js";
import * as fs from "fs";
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
			if (!fs.existsSync(`${__dirname}/${path}`)) {
				return this.bot.logger.warn(`Plugin "${path}" could not be resolved.`);
			} else {
				import(`./${path}`)
				.then((Plugin) => {
					const plugin: BasePlugin = new Plugin.default(this.bot);
					if (!plugin.options.reloadable) {
						this.bot.logger.warn(`Plugin "${plugin.options.name}" is marked as "unreloadable".`);
					}
					this.spawn(plugin);
				}, (err) => {
					this.bot.logger.error(err);
				});
			}
		});
	}
}
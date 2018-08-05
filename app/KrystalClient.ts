import * as Discord from "discord.js";
import * as Mongoose from "mongoose";
import * as Winston from "winston";
import { EventHandler } from "./EventUtil";
import { PluginManager } from "./plugins/PluginManager";

export interface IKrystalClientOptions {
	defaults: {
		prefix: string,
	};
	bot: {
		token: string,
		plugins: string[],
		events: string[],
	};
	db: {
		url: string,
	};
}

export class KrystalClient {
	public logger: Winston.Logger;
	public client: Discord.Client;
	public cache: Discord.Collection<string, any>;
	// public eventHandlers: Discord.Collection<string, EventHandler>;
	public startedOn: number;
	public PluginManager: PluginManager;
	public EventHandler: EventHandler;
	public config: IKrystalClientOptions;

	constructor(config: IKrystalClientOptions) {
		this.config = config;
		this.logger = Winston.createLogger(require("./config/winston"));
		this.client = new Discord.Client();
		this.cache = new Discord.Collection();
		// this.eventHandlers = new Discord.Collection();
		this.startedOn = Date.now();
		this.PluginManager = new PluginManager(this);
		this.EventHandler = new EventHandler(this);
		this.logger.debug("KrystalClient initialised.");
	}

	public async start() {
		this.logger.info("Krystal starting...");
		await this.setupDb();
		await this.setupClient();
		this.logger.info("Krystal ready.");
		this.PluginManager.startConfiguredPlugins();
	}

	private async setupDb() {
		await Mongoose.connect(this.config.db.url, { useNewUrlParser: true })
			.catch((error) => {
				this.logger.error(error);
				process.exit(1);
			});
	}
	private async setupClient() {
		await this.client.login(this.config.bot.token)
			.catch((error) => {
				this.logger.error(error);
				process.exit(1);
			});
	}
}
import * as Discord from "discord.js";
import * as Mongoose from "mongoose";
import * as Winston from "winston";

export interface IKrystalClientOptions {
	defaults: {
		prefix: string,
	};
	bot: {
		token: string,
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
	private config: IKrystalClientOptions;

	constructor(config) {
		this.config = config;
		this.logger = Winston.createLogger(require("./config/winston"));
		this.client = new Discord.Client();
		this.cache = new Discord.Collection();
		// this.eventHandlers = new Discord.Collection();
		this.startedOn = Date.now();
	}

	public async start() {
		this.logger.info("Test log!");
		await this.setupDb();
		await this.setupClient();
	}

	private async setupDb() {
		await Mongoose.connect(this.config.db.url, { useNewUrlParser: true })
			.catch(() => {
				process.exit(1);
			});
	}
	private async setupClient() {
		await this.client.login(this.config.bot.token)
			.catch((err) => {
				process.exit(1);
			});
	}
}
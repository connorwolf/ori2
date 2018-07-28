import * as Mongoose from "mongoose";
import * as Discord from "discord.js";
import TaskManager from "./lib/TaskManager";
import Util from "./lib/Util";
import { CommandHandler } from "./lib/CommandHandler";
import PluginManager from "./lib/PluginManager";

export class Nexus {
	constructor(config) {
		this.config = config;
		this.client = new Discord.Client();
		this.cache = new Discord.Collection();
		this.eventHandlers = new Map();

		this.TaskManager = new TaskManager(this);
		this.CommandHandler = new CommandHandler(this);
		this.PluginManager = new PluginManager(this);

		this.startedOn = Date.now();

	}

	async start() {
		await this.setupDb();
		await this.setupClient();
		await this.TaskManager.startAllTasks();
		await this.CommandHandler.start();
		await this.PluginManager.loadCore();
	}

	async setupDb() {
		Util.log("SETUP", "connecting to mongo...");
		await Mongoose.connect(this.config.db.url, { useNewUrlParser: true })
			.catch(() => {
				Util.log("MONGO", "ERROR", "failed to connect to database.");
				process.exit(1);
			});
		Util.log("MONGO", "connected.");
	}
    
	async setupClient() {
		await this.client.login(this.config.bot.token)
			.catch(() => {
				Util.log("DISCORD", "ERROR", "failed to login to Discord.");
			});
		Util.log("DISCORD","connected.");
	}
}

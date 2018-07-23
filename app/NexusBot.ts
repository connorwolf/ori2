import * as Mongoose from "mongoose";
import * as Discord from 'discord.js';
import TaskManager from './lib/TaskManager';
import Util from "../app/lib/Util";
import { EventHandler } from "./lib/EventHandler";

interface IBotConfig {
	defaults: {
		prefix: string
	};
	bot: {
		token: string
	};
	db: {
		url: string
	};
}

export class Nexus {
    public config: IBotConfig;
    public client: Discord.Client;
    public cache: Discord.Collection<string, any>;
    public eventHandlers: Map<EventHandler["eventName"], EventHandler>;
    public TaskManager: TaskManager;

	constructor(config: IBotConfig) {
        this.config = config;
        this.client = new Discord.Client();
        this.cache = new Discord.Collection();
        this.TaskManager = new TaskManager(this);
        this.eventHandlers = new Map();
	}

	public async start() {
        await this.setupDb();
        await this.setupClient();
        await this.TaskManager.startAllTasks();
	}

	private async setupDb() {
        Util.log("SETUP", "connecting to mongo...");
		await Mongoose.connect(this.config.db.url, { useNewUrlParser: true })
			.catch(() => {
				Util.log("MONGO", "ERROR", "failed to connect to database.");
				process.exit(1);
			});
		Util.log("MONGO", "connected.");
    }
    
    private async setupClient() {
        await this.client.login(this.config.bot.token)
            .catch(() => {
                Util.log("DISCORD", "ERROR", "failed to login to Discord.");
            });
        Util.log("DISCORD","connected.");
    }
}

const Discord = require("discord.js"),
	Mongoose = require("mongoose");

const TaskManager = require("./lib/TaskManager"),
	Util = require("./lib/Util"),
	CommandUtil = require("./lib/CommandUtil"),
	PluginManager = require("./lib/PluginManager");

class Nexus {
	constructor(config) {
		this.config = config;
		this.client = new Discord.Client();
		this.cache = new Discord.Collection();
		this.eventHandlers = new Map();

		this.TaskManager = new TaskManager(this);
		this.CommandHandler = new CommandUtil.CommandHandler(this);
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
			.catch((err) => {
				Util.log("DISCORD", "ERROR", "failed to login to Discord.");
				Util.log("DISCORD", "ERROR", err.message);
				process.exit(1);
			});
		Util.log("DISCORD","connected.");
	}
}

module.exports = Nexus;
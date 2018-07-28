const Util = require("./Util");

const PrepareCache = require("../tasks/PrepareCache"),
	SetupEventHandlers = require("../tasks/SetupEventHandlers");

class TaskManager {
	constructor(bot) {
		this.bot = bot;
		this.tasks = [new PrepareCache(this.bot), new SetupEventHandlers(this.bot)];
	}

	async startAllTasks() {
		Util.log("STARTUP", "TaskManager initialised.");
		// require('../lib/Prototypes.js');
		this.tasks.map(async (task) => {
			Util.log("TASKMGR", `starting task ${task.options.name}`);
			await task.start(this.bot);
		});
	}
}

module.exports = TaskManager;
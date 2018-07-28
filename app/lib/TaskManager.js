import Util from "./Util";

import PrepareCache from "../tasks/PrepareCache";
import SetupEventHandlers from "../tasks/SetupEventHandlers";

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

export default TaskManager;

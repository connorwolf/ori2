import Util from '../lib/Util';
import { Nexus } from "../NexusBot";
import { BaseTask } from "../tasks/BaseTask";

import PrepareCache from '../tasks/PrepareCache';
import SetupEventHandlers from '../tasks/SetupEventHandlers';

class TaskManager {
    bot: Nexus;
    tasks: Array<BaseTask>;
    constructor(bot: Nexus) {
        this.bot = bot;
        this.tasks = [
            new PrepareCache(this.bot),
            new SetupEventHandlers(this.bot)
        ];
    }

    async startAllTasks() {
        Util.log("STARTUP", 'TaskManager initialised.');
        this.tasks.map(async task => { 
            Util.log("TASKMGR", `starting task ${task.options.name}`);
            await task.start(this.bot)
        });
    }

}

export default TaskManager;
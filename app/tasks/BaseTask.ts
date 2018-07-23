import { Nexus } from '../NexusBot';

export interface TaskOptions {
    name: string,
    priority?: number,
}

export class BaseTask {
    bot: Nexus;
    options: TaskOptions;
    callback: Function;

    loaded: boolean;

    started: boolean;
    startedAt: number;

    completed: boolean;
    completedAt: number;

    constructor(bot: Nexus, options: TaskOptions) {
        this.bot = bot;
        this.options = options;
        this.loaded = true;
        this.started = false;
        this.completed = false;
    }

    async start(Nexus: Nexus) {
        this.started = true;
        this.startedAt = Date.now()
        try {
        await this.callback(this.bot);
        } catch(e) {
            return e;
        }
        
        this.completed = true;
        this.completedAt = Date.now()
    }

    get timeTaken() {
        return this.completed ? Date.now() - this.startedAt : this.completedAt - this.startedAt;
    }
}
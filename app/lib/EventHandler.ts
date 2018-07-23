// import Util from '../lib/Util';
import { Nexus } from '../NexusBot';

export class SubHandler {
    public handle: Function;
    public name: string;
    constructor(parent: EventHandler, name: string, handler: Function,) {
        this.handle = handler;
        this.name = name;
    }
}

export class EventHandler {
    bot: Nexus;
    public subHandlers: Map<SubHandler["name"], SubHandler>;
    defaultFunction?: Function;
    eventName: string;

    constructor(bot: Nexus, eventName: string, defaultFunction?: Function) {
        this.bot = bot;
        this.eventName = eventName;
        this.defaultFunction = defaultFunction;
        this.subHandlers = new Map();

        bot.client.on(eventName, (...args: Array<any>) => {
            this.defaultFunction ? this.defaultFunction(this, ...args) : null;
            this.subHandlers.forEach((handler: SubHandler) => {
                handler.handle(this, ...args)
            })
        });
    }

    addHandler(handler: SubHandler) {
        this.subHandlers.set(handler.name, handler);
    }

    removeHandler(handler: SubHandler) {
        this.subHandlers.delete(handler.name);
    }
}
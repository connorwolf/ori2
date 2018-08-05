import { Collection } from "discord.js";
import { KrystalClient } from "./KrystalClient";

export interface IHandlerOptions {
	eventType: string;
}

export interface ISubHandlerOptions {
	eventType: string;
	key: string;
	handler?: Handler;
}

export class EventHandler {
	public bot: KrystalClient;
	public events: string[];
	public handlers: Collection<string, Handler>;
	constructor(bot: KrystalClient) {
		this.bot = bot;
		this.events = bot.config.bot.events;
		this.handlers = new Collection();
		this.events.map((event) => {
			this.handlers.set(event, new Handler(this.bot, {
				eventType: event,
			}));
			this.bot.client.on(event, (...args: any[]) => this.handlers.map((handler) => handler.trigger(args)));
		});
	}

	public registerSubHandler(handler: SubHandler) {
		const HANDLER_TOADD = this.handlers.get(handler.options.eventType);
		if (HANDLER_TOADD) {
			HANDLER_TOADD.addSubHandler(handler);
		} else {
			this.bot.logger.error(`Event type "${handler.options.eventType}" does not exist on this client instance (handler: "${handler.options.key}").`);
		}
	}
}

export class Handler {
	public bot: KrystalClient;
	public options: IHandlerOptions;
	public subhandlers: Collection<string, SubHandler>;
	constructor(bot: KrystalClient, options: IHandlerOptions) {
		this.bot = bot;
		this.options = options;
		this.subhandlers = new Collection();
	}

	public trigger(...args: any[]) {
		this.subhandlers.map((subhandler) => subhandler.callback(args));
	}

	public addSubHandler(handler: SubHandler) {
		handler.options.handler = this;
		this.subhandlers.set(handler.options.key, handler);
	}
}

export class SubHandler {
	public bot: KrystalClient;
	public handler?: Handler;
	public options: ISubHandlerOptions;
	public callback: (...args: any[]) => void;
	constructor(bot: KrystalClient, options: ISubHandlerOptions, callback: (...args: any[]) => void) {
		this.bot = bot;
		this.handler = options.handler;
		this.options = options;
		this.callback = callback;
	}
}
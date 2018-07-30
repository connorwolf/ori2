const Util = require("../lib/Util");

class SubHandler {
	constructor(parent, name, handler) {
		this.parent = parent;
		this.handle = handler;
		this.name = name;
	}
}

class EventHandler {

	constructor(bot, eventName, defaultFunction) {
		this.bot = bot;
		this.eventName = eventName;
		this.defaultFunction = defaultFunction;
		this.subHandlers = new Map();

		bot.client.on(eventName, (...args) => {
			this.defaultFunction ? this.defaultFunction(this, ...args) : null;
			this.subHandlers.forEach((handler) => {
				try {
					handler.handle(this.bot, ...args);
				} catch (err) {
					Util.log(handler.name, "ERROR", err);
				}
			});
		});
	}

	addHandler(handler) {
		this.subHandlers.set(handler.name, handler);
	}

	removeHandler(handler) {
		this.subHandlers.delete(handler.name);
	}
}

module.exports = {
	SubHandler,
	EventHandler
};
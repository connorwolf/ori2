class BaseTask {
	constructor(bot, options) {
		this.bot = bot;
		this.options = options;
		this.loaded = true;
		this.started = false;
		this.completed = false;
	}

	async start() {
		this.started = true;
		this.startedAt = Date.now();
		try {
			await this.callback(this.bot);
		} catch (e) {
			return e;
		}

		this.completed = true;
		this.completedAt = Date.now();
	}

	get timeTaken() {
		return this.completed ? Date.now() - this.startedAt : this.completedAt - this.startedAt;
	}
}

module.exports = BaseTask;
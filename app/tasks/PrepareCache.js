const Util = require("../lib/Util"),
	Guild = require("../../shared/models/GuildModel").Guild,
	BaseTask = require("../tasks/BaseTask");

class PrepareCache extends BaseTask {
	constructor(bot) {
		super(bot, {
			name: "PrepareCache"
		});
		this.callback = async function() {
			Util.log("CACHE", "caching guilds...");

			await bot.client.guilds.map((g) => {
				Guild.findOne(
					{
						gid: g.id
					},
					(err, res) => {
						if (err) return Error(err.message);
						if (!res) {
							let guild = new Guild({
								name: g.name,
								gid: g.id,
								options: {
									channels: {},
									prefix: bot.config.defaults.prefix
								}
							});
							guild.save();
							bot.cache.set(g.id, {
								name: g.name,
								gid: g.id,
								options: {
									channels: {},
									prefix: bot.config.defaults.prefix
								}
							});
						} else {
							bot.cache.set(res.gid, res);
						}
						bot.cache.get(g.id) ? null : Util.log("CACHE", "ERROR", `${g.id} failed`);
					}
				);
			});
			Util.log("CACHE", "done.");
		};
	}
}

module.exports = PrepareCache;
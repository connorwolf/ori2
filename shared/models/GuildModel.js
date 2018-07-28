const Mongoose = require("mongoose");
// import { IGuild } from "../interfaces/Guild";

const GuildSchema = new Mongoose.Schema({
	name: String,
	gid: String,
	options: {
		channels: {
			log: String,
			defaults: String,
			commands: String
		},
		prefix: String
	},
	updatedAt: Date
}, {
	collection: "guilds"
});

const Guild = Mongoose.model("Guild", GuildSchema);

module.exports = {
	GuildSchema,
	Guild
};
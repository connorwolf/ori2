const Mongoose = require("mongoose");
// import { IGuild } from "../interfaces/Guild";

const PartnershipSchema = new Mongoose.Schema({
	guildId: String,
	userId: String,
	userTag: String,
	invite: String,
	description: String,
	partneredAt: Date
}, {
	collection: "sfepartnerships"
});

const Partnership = Mongoose.model("Partnership", PartnershipSchema);

module.exports = {
	PartnershipSchema,
	Partnership
};
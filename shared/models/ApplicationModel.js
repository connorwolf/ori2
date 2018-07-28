const Mongoose = require("mongoose");
const Discord = require("discord.js");

const ApplicationSchema = new Mongoose.Schema({
	user: Discord.User,
	name: String,
	createdTimestamp: Number,
	questions: Array
});

const Application = Mongoose.Model("Application", ApplicationSchema);

module.exports = {
	ApplicationSchema,
	Application
};
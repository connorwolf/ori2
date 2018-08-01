const Mongoose = require("mongoose");

const ApplicationSchema = new Mongoose.Schema({
	userId: String,
	userTag: String,
	createdTimestamp: Number,
	questions: Array,
	answer: String
});

const Application = Mongoose.model("Application", ApplicationSchema);

module.exports = {
	ApplicationSchema,
	Application
};
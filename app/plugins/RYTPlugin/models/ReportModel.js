const Mongoose = require("mongoose");
// import { IGuild } from "../interfaces/Guild";

const ReportSchema = new Mongoose.Schema({
	sid: String,
	msg: String,
	userID: String,
	submittedAt: Date
}, {
	collection: "support"
});

const Report = Mongoose.model("Report", ReportSchema);

module.exports = {
	ReportSchema,
	Report
};
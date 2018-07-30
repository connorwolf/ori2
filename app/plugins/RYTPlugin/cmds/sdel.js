const CommandUtil = require("../../../lib/CommandUtil");

const Report = require("../models/ReportModel").Report;

const sdel = new CommandUtil.Command(
	{
		name: "sdel",
		description: "Get a support request",
		global: true,
		syntax: new CommandUtil.CommandSyntax("")
	},
	async function(b, m, a) {
		if (a.length < 1)
			m.reply(":negative_squared_cross_mark: Please specify the ID of the report to delete");
		else if (a[0] == "all") {
			Report.count({}, (err, count) => {
				if (err)
					return m.reply(
						":negative_squared_cross_mark: Could not delete reports."
					);
				else if (count < 1) return m.reply(
					":negative_squared_cross_mark: No reports to delete."
				);
				Report.deleteMany({}, (err) => {
					if (err) return m.reply(":negative_squared_cross_mark: Could not delete reports.");
					else return m.reply(`:white_check_mark: Deleted ${count} reports.`);
				});
			});
		} else if (a.length == 1) {
			Report.findOne({ sid: a[0] }, (err, res) => {
				if (err) return m.reply(":negative_squared_cross_mark: Could not delete report.");
				if (!res)
					return m.reply(
						`:negative_squared_cross_mark: A report ID \`${a[0]}\` was not found.`
					);
				Report.deleteOne({ sid: a[0] }, (err) => {
					if (err)
						return m.reply(
							`:negative_squared_cross_mark: A report ID \`${a[0]}\` was not found.`
						);
					else return m.reply(`:white_check_mark: Deleted report with ID \`${a[0]}\``);
				});
			});
		} else {
			Report.findMany({ sid: { $in: a } }, (err, res) => {
				if (err) return m.reply(":negative_squared_cross_mark: Could not delete reports.");
				if (!res)
					return m.reply(
						`:negative_squared_cross_mark: Reports with IDs \`${a.join(
							"`, `"
						)}\` were not found.`
					);
				if (res.length < a.length)
					return m.reply(":negative_squared_cross_mark: Could not delete reports.");
				else {
					Report.deleteMany({ sid: { $in: a } }, (err) => {
						if (err)
							return m.reply(
								":negative_squared_cross_mark: Could not delete reports."
							);
						else
							return m.reply(
								`:white_check_mark: Deleted reports with IDs \`${a.join("`, `")}\``
							);
					});
				}
			});
		}
	}
);

module.exports = sdel;

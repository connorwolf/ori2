const winston = require("winston");
const { combine, timestamp, printf } = winston.format;

const format = printf(info => {
	return `${info.timestamp} ${info.level} ${info.message}`;
});

var config = {
	format: combine(
		timestamp(),
		format
	),
	transports: [
		new winston.transports.Console()
	]
};

module.exports = config;
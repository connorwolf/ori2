import * as util from "util";
import "colors";
const ts = require("time-stamp");

const Util = {
	log(...args) {
		if (args[0].toUpperCase() == args[0]) args[0] = args[0].blue.bold;
		if (args[1].toUpperCase() == args[1] && args[1] == "ERROR") args[1] = args[1].red.bold;
		args[0] = util.format(ts("HH:mm:ss").gray, args[0]);
		console.log.apply(console, args);
	},
	package: require("../../package.json")
};

export default Util;

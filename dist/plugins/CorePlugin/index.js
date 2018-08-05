"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasePlugin_1 = require("../BasePlugin");
class Plugin extends BasePlugin_1.BasePlugin {
    constructor(bot, options) {
        super(bot, options);
        this.bot = bot;
        this.options = {
            name: "CorePlugin",
            path: "CorePlugin",
        };
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=index.js.map
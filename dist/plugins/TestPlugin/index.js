"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasePlugin_1 = require("../BasePlugin");
exports.TestPluginOptions = {
    name: "TestPlugin",
    path: "./TestPlugin",
};
class TestPlugin extends BasePlugin_1.BasePlugin {
    constructor(bot, options) {
        super(bot, options);
        this.bot = bot;
        this.options = {
            name: "TestPlugin",
            path: "./TestPlugin",
        };
    }
}
exports.TestPlugin = TestPlugin;
//# sourceMappingURL=index.js.map
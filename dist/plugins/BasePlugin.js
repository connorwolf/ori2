"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasePlugin {
    constructor(bot, options) {
        this.bot = bot;
        this.options = options;
    }
    start() { }
    unload() { }
    stop() { }
}
exports.BasePlugin = BasePlugin;
//# sourceMappingURL=BasePlugin.js.map
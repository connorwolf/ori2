import { KrystalClient } from "../KrystalClient";
import { BasePlugin } from "./BasePlugin";
export declare class PluginHost {
    bot: KrystalClient;
    plugin: BasePlugin;
    constructor(bot: KrystalClient, plugin: BasePlugin);
    private watch;
}

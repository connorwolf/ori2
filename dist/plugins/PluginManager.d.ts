import { Collection } from "discord.js";
import { KrystalClient } from "../KrystalClient";
import { BasePlugin } from "./BasePlugin";
import { PluginHost } from "./PluginHost";
export declare class PluginManager {
    bot: KrystalClient;
    pluginHosts: Collection<string, PluginHost>;
    constructor(bot: KrystalClient);
    spawn(plugin: BasePlugin): void;
    load(plugin: BasePlugin): Promise<void>;
    startConfiguredPlugins(): Promise<void>;
}

import { KrystalClient } from "../KrystalClient";
export interface IPluginOptions {
    name: string;
    path: string;
}
export declare class BasePlugin {
    bot: KrystalClient;
    options: IPluginOptions;
    constructor(bot: KrystalClient, options: IPluginOptions);
    start(): void;
    unload(): void;
    stop(): void;
}

export const PluginTypes = {
    
}

export interface PluginOptions {
    name: string;
    client_events?: Array<string>;
}

export class BasePlugin {
    // options: PluginOptions;
    constructor(/*options: PluginOptions*/) {
        
    }

    start() {}
}
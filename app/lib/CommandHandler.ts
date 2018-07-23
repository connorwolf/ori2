class CommandSyntax {
    syntax_string: string;
    syntaxArray: Array<string>;
    constructor(syntax_string: string) {
        this.syntax_string = syntax_string;
        this.syntaxArray = this.syntax_string.split(' ');
    }
}

interface CommandOptions {
    name: string;
    description: string;
    syntax: CommandSyntax
}

interface CommandActionOptions {
    type: string;
}

class Command {

}

class CommandAction {

}

class CommandHandler {
    globalCommands: Map<string, any>;
    constructor() {

    }
    registerCommand(command: Command) {

    }
    unregisterCommand(commandid: string) {
        this.globalCommands.set(commandid, null);
    }
}
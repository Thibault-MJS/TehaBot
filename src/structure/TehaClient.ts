import {Client, Collection} from 'discord.js';
import CommandHandler from './CommandHandler';
import Command from './Command';

export default class TehaClient extends Client {
    private clientToken: string;
    public prefix: string;
    private commandHandler: CommandHandler;
    public commands: Collection<string, Command>;
    public aliases: Collection<string, string>;

    constructor(token: string, prefix: string, partials: string[]) {
        super({ intents: 3243773, partials: ["CHANNEL", "MESSAGE", "USER"] });
        this.clientToken = token;
        this.prefix = prefix;
        this.commandHandler = new CommandHandler('../commands/');
        this.commands = this.commandHandler.commandCollection;
        this.aliases = this.commandHandler.aliasesCollection;
    }

    initialize() {
        this.login(this.clientToken).then(() => console.log(`${this.user?.username} est prêt à l'emploi.`));
        this.commandHandler.useMultifolder().then(() => console.log("Le système de commandes est bien chargé."));
    }
}
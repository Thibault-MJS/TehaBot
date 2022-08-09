import {Client, Collection} from 'discord.js';
import CommandHandler from './CommandHandler';
import Command from './Command';
import EventHandler from './EventHandler';
import { Sequelize } from 'sequelize';

export default class AvaClient extends Client {
    private clientToken: string;
    public prefix: string;
    private commandHandler: CommandHandler;
    private eventHandler: EventHandler;
    public commands: Collection<string, Command>;
    public aliases: Collection<string, string>;
    public db: Sequelize;

    constructor(token: string, prefix: string) {
        super({ intents: 3243773, partials: ["CHANNEL", "MESSAGE", "USER"] });
        this.clientToken = token;
        this.prefix = prefix;
        this.commandHandler = new CommandHandler(__dirname + '/../commands/');
        this.eventHandler = new EventHandler(__dirname + '/../events/', this);
        this.commands = this.commandHandler.commandCollection;
        this.aliases = this.commandHandler.aliasesCollection;
        this.db = new Sequelize({
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            dialect: "mysql"
        });
    }

    initialize() {
        this.login(this.clientToken).then(() => console.log(`${this.user?.username} est prêt à l'emploi.`));
        this.commandHandler.useMultifolder().then(() => console.log("Le système de commandes est bien chargé."));
        this.eventHandler.useMultifolder().then(() => console.log("Le système d'événement a bien été chargé"));
    }
}
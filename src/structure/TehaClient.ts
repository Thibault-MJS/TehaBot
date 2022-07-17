import {Client} from 'discord.js';

export default class TehaClient extends Client {
    private clientToken: string;
    public prefix: string;

    constructor(token: string, prefix: string, partials: string[]) {
        super({ intents: 3243773, partials: ["CHANNEL", "MESSAGE", "USER"] });
        this.clientToken = token;
        this.prefix = prefix;
    }

    initialize() {
        this.login(this.clientToken);
    }
}
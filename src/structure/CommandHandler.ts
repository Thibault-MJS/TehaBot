import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { sep } from 'path';
import Command from './Command';

export default class CommandHandler {
    public commandDir: string;
    public commandCollection: Collection<string, Command>;
    public aliasesCollection: Collection<string, string>;

    constructor(commandDir: string) {
        this.commandDir = commandDir;
        this.commandCollection = new Collection();
        this.aliasesCollection = new Collection();
    }

    async useMultifolder() {
        readdirSync(this.commandDir).map(async (category: string) => {
            const commands = readdirSync(`${this.commandDir}${sep}${category}${sep}`).filter((files: string) => files.endsWith('.ts'));
            for (const file of commands) {
                const command: Command = await import(`${this.commandDir}/${category}/${file}`);
                this.saveCommand(command);
            }
        });
    }

    private saveCommand(command: Command) {
        if (this.commandCollection.has(command.name)) return console.log(`La commande ${command.name} existe déjà.`);
        this.commandCollection.set(command.name, command);
        if (typeof (command.options.aliases) === 'object') {
            command.options.aliases.map((alias: string) => {
                if (this.aliasesCollection.has(alias)) return;
                this.aliasesCollection.set(alias, command.name);
            });
        }
    }

    async useSingleFolder() {
        const commands = readdirSync(this.commandDir).filter((files: string) => files.endsWith('.ts'));
        for (const file of commands) {
            const command: Command = await import(`${this.commandDir}/${file}`);
            this.saveCommand(command);
        }
    }
}
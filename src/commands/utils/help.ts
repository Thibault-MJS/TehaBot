import { Message } from "discord.js";
import AvaClient from "../../structure/AvaClient";
import Command from "../../structure/Command";

export default class HelpCommand extends Command {
    constructor() {
        super('help', {
            category: "Utilitaire",
            description: "Envoie la liste des commandes disponibles (Si un argument est passé en paramètre, cela donnera les détails de la commande).",
            args: [
                {
                    name: "commande",
                    value: "text",
                    optional: true
                }
            ],
            aliases: ["h"]
        });
    }

    run(bot: AvaClient, message: Message, args: string[]): void {
        
    }
}
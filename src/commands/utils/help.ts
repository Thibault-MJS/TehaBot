import { Collection, Message, MessageEmbedOptions } from "discord.js";
import AvaClient from "../../structure/AvaClient";
import Command from "../../structure/Command";
import ResponseBuilder from "../../utils/ResponseBuilder";

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
            aliases: ["h"],
            cooldown: 1000
        });
    }

    classifyCommands(commands: Collection<string, Command>) {
        let categories: string[] = [];
        commands.map(command => {
            if (categories.includes(command.options.category)) return;
            categories.push(command.options.category);
        });
        return categories;
    }

    run(bot: AvaClient, message: Message, args: string[]): any {
        if (args[0]) {
            const commandArg = args[0];
            let cmd;
            
            if (bot.commands.has(commandArg)) cmd = bot.commands.get(commandArg);
            else if (bot.aliases.has(commandArg)) cmd = bot.commands.get(bot.aliases.get(commandArg) as string);

            let ErrorNotFound: MessageEmbedOptions = new ResponseBuilder(message.author)
                .setTitle("Commande non trouvée")
                .setColor("RED")
                .setMessage(`La commande \`${commandArg}\` n'a pas été trouvé. Veuillez taper \`${bot.prefix}help\` afin d'avoir la liste des commandes disponibles.`)
                .setType('error')
                .build();
            if (!cmd) return message.channel.send({ embeds: [ErrorNotFound] });

            let CommandFound: MessageEmbedOptions = {
                title: `Commande ${cmd.name}`,
                color: "#f024a2",
                description: `Voici les détails concernant la commande \`${cmd.name}\`. Afin d'accéder à la liste de toutes les commandes disponibles, veuillez taper \`${bot.prefix}help\`.`,
                fields: [
                    {
                        name: "> Commande",
                        value: `\`\`\`${bot.prefix}${cmd.name} ${cmd.options.args?.map(arg => arg.optional ? `<${arg.name}>` : `[${arg.name}]`).join(' ')}\`\`\``
                    },
                    {
                        name: "> Catégorie",
                        value: `\`\`\`${cmd.options.category}\`\`\``,
                        inline: true
                    },
                    {
                        name: "> Alias",
                        value: `\`\`\`${cmd.options.aliases ? cmd.options.aliases.join(', ') : "Aucun alias"}\`\`\``,
                        inline: true
                    },
                    {
                        name: "> Cooldown",
                        value: `\`\`\`js\n${cmd.options.cooldown ? (cmd.options.cooldown/1000).toFixed(2) : "0" }s\`\`\``,
                        inline: true
                    },
                    {
                        name: "> Description",
                        value: `\`\`\`${cmd.options.description ?? "Aucune description"}\`\`\``
                    },
                    {
                        name: "> Permissions nécessaires",
                        value: `\`\`\`${cmd.options.permissions ? cmd.options.permissions.join(", ") : "Aucune permission nécessaire"}\`\`\``
                    }
                ],
                footer: {
                    text: "AvaBot (c) 2022",
                    iconURL: message.author.displayAvatarURL()
                },
                timestamp: Date.now()
            }
            return message.channel.send({ embeds: [CommandFound] });
        }
        const categories = this.classifyCommands(bot.commands);
        let HelpResponse: MessageEmbedOptions = {
            author: {
                name: `Commandes de ${bot.user?.username}`,
                iconURL: bot.user?.displayAvatarURL()
            },
            description: `Voici la liste des commandes disponibles. Le préfix est \`${bot.prefix}\`.`,
            fields: [],
            color: "#f024a2",
            footer: {
                text: "AvaBot (c) 2022",
                iconURL: message.author.displayAvatarURL()
            },
            timestamp: Date.now()
        }
        categories.map(category => {
            const commands = bot.commands.filter(command => command.options.category.toLowerCase() === category.toLowerCase());
            HelpResponse.fields?.push({
                name: `> ${category} (${commands.size})`,
                value: `${commands.map(command => `\`${command.name}\``).join(', ')}`
            });
        });
        return message.channel.send({ embeds: [HelpResponse] });
    }
}
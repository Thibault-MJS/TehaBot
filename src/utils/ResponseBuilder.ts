import { ClientUser, ColorResolvable, MessageEmbedOptions, User } from "discord.js";
import { AvaResponseData, AvaResponseType } from "../types/AvaResponse";

export default class ResponseBuilder {
    private type: AvaResponseType;
    private message?: string|null;
    private title?: string|null;
    private color?: ColorResolvable;
    private author: ClientUser | User;
    
    constructor(author: ClientUser|User, data?: AvaResponseData) {
        this.type = data ? data.type : 'info';
        this.title = data ? data.title : null;
        this.message = data ? data.message : null;
        this.color = data ? data.color : undefined;
        this.author = author;
    }

    setType(type: AvaResponseType): this {
        this.type = type;
        return this;
    }

    setMessage(message: string): this {
        this.message = message;
        return this;
    }

    setColor(color: ColorResolvable): this {
        this.color = color;
        return this
    }

    setTitle(title: string): this {
        this.title = title;
        return this
    }

    build(): MessageEmbedOptions {
        if (!this.message || !this.title) throw new Error("No message and title found.");
        const typesEmote = {
            info: ":information_source:",
            success: ":white_check_mark:",
            error: ":x:",
            warning: ":warning:"
        }
        return {
            title: this.title,
            description: `${typesEmote[this.type]} ${this.message}`,
            color: this.color,
            footer: {
                text: "AvaBot (c) 2022",
                iconURL: this.author.displayAvatarURL()
            },
            timestamp: Date.now()
        };
    }
}
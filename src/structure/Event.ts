import { EventOptions } from "../types/EventOptions";
import AvaClient from "./AvaClient";
import { ClientEvents } from "discord.js";

export default abstract class Event {
    public name: keyof ClientEvents;
    public options: EventOptions;

    constructor(name: keyof ClientEvents, options: EventOptions) {
        this.name = name;
        this.options = options;
    }

    abstract run(bot: AvaClient, ...args: any[]): void;
}
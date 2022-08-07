import { EventOptions } from "../types/EventOptions";
import TehaClient from "./TehaClient";

export default abstract class Event {
    public name: string;
    public options: EventOptions;

    constructor(name: string, options: EventOptions) {
        this.name = name;
        this.options = options;
    }

    abstract run(bot: TehaClient, ...args: any[]): void;
}
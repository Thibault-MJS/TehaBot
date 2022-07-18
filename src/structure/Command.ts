import {CommandOptions} from "../types/CommandOptions";

export default class Command {
    public name: string;
    public options: CommandOptions;

    constructor(name: string, options: CommandOptions) {
        this.name = name;
        this.options = options;
    }
}
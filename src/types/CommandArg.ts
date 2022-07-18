export type CommandArgument = {
    name: string;
    value: CommandArgumentValue;
    optional?: boolean;
}

export type CommandArgumentValue = 'number' | 'text' | 'role' | 'channel' | 'user';
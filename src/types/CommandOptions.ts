import { PermissionResolvable } from 'discord.js';
import {CommandArgument} from './CommandArg';

export type CommandOptions = {
    category: string,
    aliases?: string[],
    cooldown?: number;
    args?: CommandArgument[];
    description?: string;
    permissions?: PermissionResolvable;
}
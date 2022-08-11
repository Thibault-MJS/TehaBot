import { PermissionResolvable } from 'discord.js';
import {CommandArgument} from './CommandArg';

export type CommandOptions = {
    category: string;
    aliases?: string[];
    cooldown?: number;
    args?: CommandArgument[];
    description?: string;
    permissions?: PermissionResolvable[];
}

export type CommandCooldown = {
    name: string;
    last_used: number;
    author: string;
}
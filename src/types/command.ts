import { CacheType, ChatInputCommandInteraction } from 'discord.js'

export interface BotCommand {
  name: string;
  description: string;
  options: OptionCommand[];
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
}

export interface OptionCommand {
  name: string;
  description: string;
  type: number;
  required: boolean;
}

export interface InteractionCommand {
  name: string;
  description: string;
}

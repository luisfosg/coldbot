import { CacheType, ChatInputCommandInteraction } from 'discord.js'

export interface BotCommand {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
}

export interface InteractionCommand {
  name: string;
  description: string;
}

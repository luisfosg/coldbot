import { ButtonInteraction, CacheType, ChatInputCommandInteraction } from 'discord.js'

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

export interface Action {
  name: string;
  execute: (interaction: ButtonInteraction<CacheType>) => Promise<void>
}

export interface BotCommand {
  name: string;
  description: string;
  options?: OptionCommand[];
  actions?: Action[];
  permissions?: string[];
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
}

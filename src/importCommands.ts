import { Collection } from 'discord.js';
import fs from 'fs';

import { BotCommand } from '#types/command'
import { ENV } from './constants'

export const commands = new Collection<string, BotCommand>();

export const importCommands = async (): Promise<BotCommand[]> => {
  const COMMANDS = [];
  const commandFiles = fs.readdirSync(ENV.commandsFolderPath);

  for (const file of commandFiles) {
    if (!file.endsWith('.ts') && file.includes('.')) continue;

    const filePath = `${ENV.commandsFolderPath}/${file}`;
    const { default: commandModule } = await import(filePath);

    commands.set(commandModule.name, commandModule);
    COMMANDS.push(commandModule);
  }

  console.log('LISTA DE COMANDOS EN USO: ', COMMANDS.map(command => command.name))
  return COMMANDS
};

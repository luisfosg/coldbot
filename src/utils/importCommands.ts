import fs from 'fs';

import { BotCommand } from '@/types/command'
import { ENV, commands } from '../constants'

const getFilePath = (file: string) => {
  if (!file.endsWith('.js') && !file.endsWith('.ts')) return file + '/index.js'
  return file
}

export const importCommands = async (): Promise<BotCommand[]> => {
  const COMMANDS: BotCommand[] = [];
  const env = ENV();

  const commandFiles = await fs.promises.readdir(env.commandsFolderPath);

  for (const file of commandFiles) {
    if ((!file.endsWith('.ts') && !file.endsWith('.js')) && file.includes('.')) continue;

    const filePath = new URL(getFilePath(`./commands/${file}`), import.meta.url).toString();
    const { default: commandModule } = await import(filePath);

    commands.set(commandModule.name, commandModule);
    COMMANDS.push(commandModule);
  }

  console.log('LISTA DE COMANDOS EN USO: ', COMMANDS.map(command => command.name));
  return COMMANDS;
};

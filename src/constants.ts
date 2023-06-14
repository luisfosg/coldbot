import { Collection } from 'discord.js';
import { dirname, resolve } from 'path';
import { URL, fileURLToPath } from 'url';

import { BotCommand } from '@/types/command'

const moduleURL = new URL(import.meta.url);
const __dirname = dirname(fileURLToPath(moduleURL));

export const ENV = () => (
  {
    token: process.env.TOKEN_BOT || '',
    clientId: process.env.CLIENT_ID || '',
    commandsFolderPath: resolve(__dirname, './commands'),
    eventsFolderPath: resolve(__dirname, './events'),
  }
)

export const commands = new Collection<string, BotCommand>();
import { Collection } from 'discord.js';
import fs from 'fs';

import { client } from '#/server'
import { BotEvent } from '@/types/event'
import { ENV } from '#/constants'

export const events = new Collection<string, BotEvent>();

export const importEvents = async (): Promise<any> => {
  const EVENTS = [];
  const env = ENV()

  const eventFiles = await fs.promises.readdir(env.eventsFolderPath);

  for (const file of eventFiles) {
    if ((!file.endsWith('.ts') && !file.endsWith('.js')) && file.includes('.')) continue;

    const filePath = `${env.eventsFolderPath}/${file}`;
    const eventModule = await import(filePath);
    const event: BotEvent = eventModule.default

    events.set(event.name, event);
    EVENTS.push(event);

    client[event.once ? 'once' : 'on'](
      event.name,
      (...args: any) => event.execute(...args)
    );
  }

  console.log('LISTA DE EVENTOS EN USO: ', EVENTS.map(event => event.name))
};

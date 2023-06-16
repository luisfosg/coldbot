import Table from 'cli-table3'
import fs from 'fs'

import { client } from '#/server'
import { validEvent } from './validEvent'
import { BotEvent } from '@/types/event'
import { ENV as env, events, util } from '#/constants'

const table = new Table({
  chars: util.charsTable,
  style: { 'padding-left': 1, 'padding-right': 1 },
  head: ['LIST OF EVENTS'],
  colWidths: [20]
})

export const importEvents = async (): Promise<void> => {
  const eventFiles = await fs.promises.readdir(env.eventsFolderPath)

  for (const file of eventFiles) {
    if ((!file.endsWith('.ts') && !file.endsWith('.js')) && file.includes('.')) continue

    const filePath = `${env.eventsFolderPath}/${file}`
    const eventModule = await import(filePath)
    const event: BotEvent = eventModule.default

    events.set(event.name, event)
    table.push([event.name])

    client[event.once ? 'once' : 'on'](
      event.name,
      (...args: any[]) => validEvent(args, event)
    )
  }

  console.log(table.toString())
}

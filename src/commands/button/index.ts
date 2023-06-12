import { BotCommand } from '@/types/command'

import { ButtonCommand } from './execute'
import { CancelAction } from './actions/cancel'
import { ConfirmAction } from './actions/confirm'

const command: BotCommand = {
  name: 'button',
  description: 'Replies with Button',
  options: [
    {
      name: 'argumento1',
      description: 'Primer argumento',
      type: 3,
      required: true,
    },
  ],
  actions: [
    { name: 'cancel', execute: CancelAction },
    { name: 'confirm', execute: ConfirmAction }
  ],
  execute: ButtonCommand
};

export default command

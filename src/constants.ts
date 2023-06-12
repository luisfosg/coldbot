import path from 'path';

export const ENV = () => (
  {
    token: process.env.TOKEN_BOT || '',
    clientId: process.env.CLIENT_ID || '',
    commandsFolderPath: path.resolve(__dirname, './commands')
  }
)

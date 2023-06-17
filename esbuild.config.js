import { build } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { URL, fileURLToPath } from 'url'
import { readdirSync } from 'fs'

config()

const moduleURL = new URL(import.meta.url)
const __dirname = dirname(fileURLToPath(moduleURL))

const commandsFolderPath = resolve(__dirname, './src/commands')
const commandFiles = readdirSync(commandsFolderPath)

const eventsFolderPath = resolve(__dirname, './src/events')
const eventFiles = readdirSync(eventsFolderPath)

const getFilePath = (file) => {
  if (!file.endsWith('.ts') && file.includes('.')) return
  if (!file.endsWith('.ts')) return file + '/index.ts'

  return file
}

build({
  entryPoints: [
    'src/index.ts',
    ...commandFiles.map((file) => getFilePath(`src/commands/${file}`)),
    ...eventFiles.map((file) => getFilePath(`src/events/${file}`))
  ],
  splitting: true,
  bundle: true,
  platform: 'node',
  target: 'es2022',
  format: 'esm',
  minify: true,
  outdir: 'dist',
  plugins: [nodeExternalsPlugin()],
  alias: {
    '#': './src',
    '@/utils': './src/utils',
    '@/commands': './src/commands',
    '@/types': './src/types',
    '@/events': './src/events',
    '@/services': './src/services',
    '@/entity': './src/entity'
  }
})
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

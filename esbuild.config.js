const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const commandsFolderPath = path.resolve(__dirname, './src/commands');
const commandFiles = fs.readdirSync(commandsFolderPath);

const eventsFolderPath = path.resolve(__dirname, './src/events');
const eventFiles = fs.readdirSync(eventsFolderPath);

const getFilePath = (pathJoin, file) => {
  if (!file.endsWith('.ts') && file.includes('.')) return;
  if (!file.endsWith('.ts')) return getFilePath(pathJoin, file + '/index.ts')

  return path.join(pathJoin, file)
}

esbuild
  .build({
    entryPoints: [
      'src/index.ts',
      ...commandFiles.map((file) => getFilePath('src/commands/', file)),
      ...eventFiles.map((file) => getFilePath('src/events/', file))
    ],
    bundle: true,
    platform: 'node',
    target: ['node12'], // Versión de Node.js objetivo
    outdir: 'dist', // Ruta del archivo de salida
    plugins: [nodeExternalsPlugin()],
    alias: {
      '#': './src',
      '@/utils': './src/utils',
      '@/commands': './src/commands',
      '@/types': './src/types',
    },
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

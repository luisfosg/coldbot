const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { execSync } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const commandsFolderPath = path.resolve(__dirname, './src/commands');
const commandFiles = fs.readdirSync(commandsFolderPath);

const getFilePath = (file) => {
  if (!file.endsWith('.ts') && file.includes('.')) return;
  if (!file.endsWith('.ts')) return getFilePath(file + '/index.ts')

  return path.join('src/commands/', file)
}

esbuild
  .build({
    entryPoints: [
      'src/index.ts',
      ...commandFiles.map((file) => getFilePath(file))
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

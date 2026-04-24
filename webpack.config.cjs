const path = require('path');

module.exports = (options) => {
  // NestJS webpack sets filename to "apps/{name}/main.js" (using `root`),
  // but then executes from "dist/apps/{name}/src/main.js" (using `sourceRoot`).
  // We align the output filename with what NestJS actually executes.
  const rawFilename = options.output?.filename ?? 'main.js';
  const filename = rawFilename
    .replace(/[/\\]main\.js$/, '/src/main.js')
    .replace(/\\/g, '/');

  return {
    ...options,
    devtool: false,
    output: {
      ...options.output,
      filename,
    },
    resolve: {
      ...options.resolve,
      alias: {
        ...(options.resolve?.alias ?? {}),
        'obai/auth': path.resolve(__dirname, 'libs/auth/src'),
        'obai/common': path.resolve(__dirname, 'libs/common/src'),
        'obai/entities': path.resolve(__dirname, 'libs/entities/src'),
        'obai/i18n': path.resolve(__dirname, 'libs/i18n/src'),
        'obai/intelligence': path.resolve(__dirname, 'libs/intelligence/src'),
        'obai/messaging': path.resolve(__dirname, 'libs/messaging/src'),
        'generated/prisma': path.resolve(__dirname, 'generated/prisma'),
      },
      extensionAlias: {
        '.js': ['.ts', '.js'],
        '.mjs': ['.mts', '.mjs'],
        '.cjs': ['.cts', '.cjs'],
      },
    },
  };
};
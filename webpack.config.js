let json = require('./package.json');

const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const path = require('path');

module.exports = function (options, webpack) {
  const basePackage = {
    name: json.name,
    version: json.version,
    description: json.description,
    main: './main.js',
    engines: {
      node: '>= 14',
    },
  };

  return {
    ...options,
    plugins: [
      ...options.plugins,
      new GeneratePackageJsonPlugin(basePackage, {
        debug: true,
        useInstalledVersions: true,
        resolveContextPaths: [__dirname],
        sourcePackageFilenames: [
          path.join(__dirname, '..', '..', 'package.json'),
        ],
        forceWebpackVersion: 'webpack5',
        excludeDependencies: ['aws-sdk'],
      }),
    ],
  };
};

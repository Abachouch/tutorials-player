"use strict";

const path = require("path");

module.exports = (env) => {
  const isEnvDevelopment = env.devlopement;
  const isEnvProduction = env.production;

  const mode = isEnvDevelopment ? "development" : "production";

  return [
    {
      entry: "./electron/main.ts",
      target: "electron19.0-main",
      mode: mode,
      watch: true,
      module: {
        rules: [
          {
            test: /\.ts?$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: [".ts", ".js"],
      },

      output: {
        path: path.resolve(__dirname, "../build"),
        filename: "electron.js",
      },
    },
    {
      entry: "./electron/preload.ts",
      target: "electron19.0-preload",
      mode: mode,
      watch: true,
      module: {
        rules: [
          {
            test: /\.ts?$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: [".ts", ".js"],
      },

      output: {
        path: path.resolve(__dirname, "../build"),
        filename: "preload.js",
      },
    },
  ];
};

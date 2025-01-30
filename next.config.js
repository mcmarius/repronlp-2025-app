/** @type {import('next').NextConfig} */
//const Handlebars = require("handlebars");
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const nextConfig = {
  /*webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.module = {
      rules: [
        {
          test: /.*\.html$/,
          loader: "html-loader",
          options: {
            sources: false,
          }
        }
      ]
    }
    return config
  },*/
  logging: {}
}

module.exports = nextConfig

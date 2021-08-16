const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:3001/",
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3001,
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      exposes: {
        "./HomeApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

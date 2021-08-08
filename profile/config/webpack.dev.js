const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:3003/",
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3003,
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./ProfileApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

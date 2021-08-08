const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:3000/",
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        home: "home@http://localhost:3001/remoteEntry.js",
        dashboard: "dashboard@http://localhost:3002/remoteEntry.js",
        profile: "profile@http://localhost:3003/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

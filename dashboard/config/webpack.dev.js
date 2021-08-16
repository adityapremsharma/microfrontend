const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:3002/",
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3002,
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),

    // name property should be unique. It will be used in host webpack file.
    // filename should be the same in all apps
    // exposes property is used to share components between apps. ./DashboardApp will be used in host DashboardApp file import.
    // Here, we are sharing bootstrap file to host's DashboardApp file.
    // shared property helps to share modules between all apps so browser loads only one js file for each module.
    // Make sure to use same version for every module.
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

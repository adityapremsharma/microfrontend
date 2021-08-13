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

    // name property is not required here but according to convention, it is a good practice to name all our apps.
    // remotes property will be resopnsible to communicate with the apps and get the exposed file which can be imported in this app.
    // We are getting remoteEntry.js file which will have app the exposes file.
    // remotes object keys should be unique. It will be used in apps import.
    // shared property helps to share modules between all apps so browser loads only one js file for each module.
    // Make sure to use same version for every module.
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

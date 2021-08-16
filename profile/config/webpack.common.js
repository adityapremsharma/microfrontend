const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Generates an HTML file from a template

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3, targets: "defaults" }],
              "@babel/preset-react",
            ],
          },
        },
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
};

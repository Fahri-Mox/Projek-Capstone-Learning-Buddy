/** @format */

const path = require("path");

module.exports = {
  entry: "./src/scripts/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "src"), // serve index.html
      },
      {
        directory: path.join(__dirname, "dist"), // serve bundle.js
      },
    ],
    compress: true,
    port: 8085,
    historyApiFallback: true,
  },

  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

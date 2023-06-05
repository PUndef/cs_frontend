const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "2 lesson",
      template: "src/2-lesson/1-task/index.html"
    })
    // new CopyPlugin({
    //   patterns: [{ from: "2-lesson/1-task/assets", to: "assets" }]
    // })
  ],

  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000
  }
};

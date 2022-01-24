const webpack = require("webpack");

module.exports = {
  plugins: [],
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      //...
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: "babel-loader", options: { presets: ["env", "react"] } },
      },
    ],
  },
  // to mimic GitHub Pages serving 404.html for all paths
  // and test spa-github-pages redirect in dev
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /\//, to: "/404.html" }],
    },
  },
};

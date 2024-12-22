/* eslint-disable react-hooks/rules-of-hooks */
const { override, useBabelRc, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  // file-loader để xử lý các tệp video
  addWebpackModuleRule({
    test: /\.(mp4|webm|ogg)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "static/media/videos/[name].[contenthash].[ext]",
          publicPath: "/static/media/videos/",
        },
      },
    ],
  })
);

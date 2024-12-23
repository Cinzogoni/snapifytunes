/* eslint-disable react-hooks/rules-of-hooks */
const { override, useBabelRc, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  // Bổ sung file-loader để xử lý các tệp video
  addWebpackModuleRule({
    test: /\.(mp4|webm|ogg)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[contenthash].[ext]",
          outputPath: `static/media/`,
        },
      },
    ],
  })
);

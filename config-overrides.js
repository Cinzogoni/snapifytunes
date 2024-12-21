/* eslint-disable react-hooks/rules-of-hooks */
const { override, useBabelRc, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "static/media/",
        },
      },
    ],
  })
);

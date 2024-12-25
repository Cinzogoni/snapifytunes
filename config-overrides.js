const { override, useBabelRc } = require("customize-cra");
const path = require("path");

module.exports = override(
  useBabelRc(),

  (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      svgo: "svgo@latest",
      "nth-check": "nth-check@latest",
      postcss: "postcss@latest",
      "resolve-url-loader": "resolve-url-loader@latest",
      "~": path.resolve(__dirname, "src"),
    };

    const plugins = config.plugins.map((plugin) => {
      if (plugin.constructor.name === "MiniCssExtractPlugin") {
        plugin.options.ignoreOrder = true;
      }
      return plugin;
    });
    config.plugins = plugins;

    return config;
  }
);

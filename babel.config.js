const ReactCompilerConfig = {
  target: "18",
};

module.exports = function (api) {
  api.cache(true);

  return {
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "~": "./src",
          },
        },
      ],
      ["babel-plugin-react-compiler", ReactCompilerConfig],
    ],
  };
};

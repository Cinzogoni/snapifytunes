const videos = require.context("../assets/videos", false, /\.(mp4|webm|ogg)$/);

const videoFiles = videos.keys().reduce((acc, filePath) => {
  const fileName = filePath.replace("./", "");
  const videoUrl = videos(filePath);

  acc[fileName] = {
    default:
      process.env.NODE_ENV === "production"
        ? `/snapifytunes/static/media/videos/${fileName}`
        : videoUrl.default,
  };

  return acc;
}, {});

export default videoFiles;

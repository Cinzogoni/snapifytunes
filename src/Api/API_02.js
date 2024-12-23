const videos = require.context("../assets/videos", false, /\.(mp4|webm|ogg)$/);

const videoFiles = videos.keys().reduce((acc, filePath) => {
  const fileName = filePath.replace("./", "");
  acc[fileName] = videos(filePath);
  return acc;
}, {});

const getVideoLink = (videoName) => {
  if (process.env.NODE_ENV === "production") {
    return `${process.env.PUBLIC_URL}/videos/${videoName}`;
  } else {
    return videoFiles[videoName];
  }
};

const apiMoment = {
  getMoment: () => {
    return [
      {
        id: 0,
        date: `2024-08-25`,
        name: `THE PROCESS OF MAKING 12H03 - TOULIVER & MASTAL`,
        link: getVideoLink("MAKING 12H03 TOULIVER MASTAL.mp4"),
      },
      {
        id: 1,
        date: `2024-08-15`,
        name: "THE PROCESS OF MAKING ĐÀO LIỄU - TOULIVER & TRIPLE D",
        link: getVideoLink("ĐÀO LIỄU TOULIVER TRIPLE D.mp4"),
      },
      {
        id: 2,
        date: `2024-08-10`,
        name: `[BEAT BREAKDOWN] TRỐNG CƠM - TỰ LONG, SOOBIN, CƯỜNG SEVEN, (CÔNG DIỄN 1 ANH TRAI VƯỢT NGÀN CHÔNG GAI)`,
        link: getVideoLink("BEAT TRỐNG CƠM-ATVNTG.mp4"),
      },
      {
        id: 3,
        date: `2024-08-09`,
        name: `[BEAT BREAKDOWN] GIÀU SANG - TIẾT MỤC LIÊN MINH KAME | CÔNG DIỄN 2 ANH TRAI VƯỢT NGÀN CHÔNG GAI 2024`,
        link: getVideoLink("GIÀUSANG-KrissNgo.mp4"),
      },
      {
        id: 4,
        date: `2024-08-20`,
        name: `[BEAT BREAKDOWN] QUAY LẠI GIƯỜNG ĐI EM - HÀ LÊ | CONCERT ANH TRAI VƯỢT NGÀN CHÔNG GAI`,
        link: getVideoLink("QLGIƯỜNGĐIEM-MASTAL.mp4"),
      },
    ];
  },
};

export default apiMoment;

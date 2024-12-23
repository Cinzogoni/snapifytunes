import classNames from "classnames/bind";
import styles from "./MomentBox.module.scss";

import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function MomentBox({ id, link, date, name, onPlay, isVideoPlaying }) {
  const [showTitle, setShowTitle] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!isVideoPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  const handlePlay = () => {
    onPlay(id);
    setShowTitle(true);
  };

  const handlePause = () => {
    setShowTitle(false);
  };

  const productionLink = `${process.env.PUBLIC_URL}${
    link.startsWith("/snapifytunes") ? link.replace("/snapifytunes", "") : link
  }`;

  console.log("link:", link);
  console.log("production link:", productionLink);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <video
          className={cx("video-player")}
          ref={videoRef}
          controls
          controlsList="nodownload"
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source
            src={process.env.NODE_ENV === "production" ? productionLink : link}
            type="video/mp4"
          />
        </video>
        {!showTitle && (
          <div className={cx("info")}>
            <h6 className={cx("date")}>{date}</h6>
            <h6 className={cx("title")}>{name}</h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default MomentBox;

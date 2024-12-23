import classNames from "classnames/bind";
import styles from "./MomentBox.module.scss";

import { useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player";

const cx = classNames.bind(styles);

function MomentBox({ id, link, date, name, onPlay, onPause, isVideoPlaying }) {
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
    onPause();
    setShowTitle(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <ReactPlayer
          url={link}
          width="100%"
          height="100%"
          controls={true}
          onPlay={handlePlay}
          onPause={handlePause}
        />

        {/* {!showTitle && (
          <div className={cx("info")}>
            <h6 className={cx("date")}>{date}</h6>
            <h6 className={cx("title")}>{name}</h6>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default MomentBox;

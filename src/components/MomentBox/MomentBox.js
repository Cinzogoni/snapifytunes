import classNames from "classnames/bind";
import styles from "./MomentBox.module.scss";

import { useState } from "react";
import ReactPlayer from "react-player";

const cx = classNames.bind(styles);

function MomentBox({ id, link, date, name, onPlay, isVideoPlaying }) {
  const [showTitle, setShowTitle] = useState(false);

  const handlePlay = () => {
    onPlay(id);
    setShowTitle(true);
  };

  const handlePause = () => {
    setShowTitle(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {!showTitle && (
          <div className={cx("info")}>
            <h6 className={cx("date")}>{date}</h6>
            <h6 className={cx("title")}>{name}</h6>
          </div>
        )}
        <ReactPlayer
          url={link}
          playing={isVideoPlaying}
          controls
          controlsList="nodownload"
          onPlay={handlePlay}
          onPause={handlePause}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default MomentBox;

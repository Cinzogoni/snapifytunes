import classNames from "classnames/bind";
import styles from "./PlaylistModeInfo.module.scss";
const cx = classNames.bind(styles);

import { useAudioPlayer } from "../../context/AudioPlayerProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useLangSwitcher } from "~/context/LangSwitcherProvider";

function PlaylistModeInfo({ defaultTitle }) {
  const { t } = useLangSwitcher();
  const {
    handleStoredAudiosMap,
    storedAudiosMap,
    storedMultipleTrackMap,
    multipleTrack,
  } = useAudioPlayer();
  const storedTrackArray = Array.from(storedMultipleTrackMap.values()).flatMap(
    (item) => item.multipleTrack
  );

  const titleValue = storedTrackArray[0];
  const activeTitle = titleValue?.name || titleValue?.topic;

  const title = multipleTrack[0]?.name;

  useEffect(() => {
    // console.log(multipleTrack);
  }, [multipleTrack, storedTrackArray, storedAudiosMap]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("info")}>
          <h1 className={cx("title")}>
            {storedAudiosMap
              ? `${t("playlistModePinned")}: ${activeTitle}`
              : `${t("playlistModeCurrent")}: ${
                  t(`topics.${defaultTitle}`) !== `topics.${defaultTitle}`
                    ? t(`topics.${defaultTitle}`)
                    : title || t("playlistNameNull")
                }`}
          </h1>
        </div>

        <div className={cx("action")}>
          <div
            className={cx("bg")}
            onClick={handleStoredAudiosMap}
            style={{
              backgroundColor: storedAudiosMap
                ? "rgba(255, 255, 255, 1)"
                : "transparent",
              backgroundImage: storedAudiosMap
                ? "linear-gradient(to top, rgba(102, 128, 150, 0.1) 30%, rgba(58, 123, 189, 0.2) 50%, rgba(145, 187, 229, 0.1) 100%)"
                : undefined,
            }}
          >
            <FontAwesomeIcon
              className={cx("memo")}
              icon={faThumbTack}
              style={{
                color: storedAudiosMap
                  ? "rgb(12, 12, 20)"
                  : "rgba(255, 255, 255, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistModeInfo;

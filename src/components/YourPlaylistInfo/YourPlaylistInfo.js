import classNames from "classnames/bind";
import styles from "./YourPlaylistInfo.module.scss";
const cx = classNames.bind(styles);

import defaultAvatar from "~/assets/images/avatar/DefaultAvatar.png";

import { useLangSwitcher } from "~/context/LangSwitcherProvider";

import { useAudioPlayer } from "../../context/AudioPlayerProvider";
import { useYourPlaylist } from "../../context/YourPlaylistProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilePen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import Player from "../Player";

function YourPlaylistInfo({
  avatars,
  titles,
  playlistInfo,
  playlistIndex,
  currentUserName,
  currentItemName,
}) {
  const { t } = useLangSwitcher();
  const {
    handleLoop,
    handleRandomTrack,
    activeLoopClick,
    setActiveLoopClick,
    activeRandomClick,
    setActiveRandomClick,
    isRandom,
  } = useAudioPlayer();

  const {
    handleEditPlaylistItem,
    handleDeletePlaylistItem,
    itemName,
    itemDescription,
    setIsNewReleasesVisible,
    setActiveNewReleasesPlaylist,
    setShowNewReleasesPlaylist,
    setIsEditing,
  } = useYourPlaylist();

  const yourPlaylistName = playlistInfo ? playlistInfo.yourPlaylistName : "";
  const yourPlaylistDescription = playlistInfo
    ? playlistInfo.yourPlaylistDescription
    : "";

  const handleEditClick = () => {
    setIsEditing(true);
    handleEditPlaylistItem(itemName, itemDescription, playlistIndex);
    setIsNewReleasesVisible(false);
    setActiveNewReleasesPlaylist(false);
    setShowNewReleasesPlaylist(false);
  };

  // console.log(playlistIndex);
  // console.log(yourPlaylistName);
  // console.log(yourPlaylistDescription);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Link to={routesConfig.home}>
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Link>
      </div>

      <div className={cx("container")}>
        <div className={cx("avatar")}>
          <img
            className={cx("default-avatar")}
            src={defaultAvatar}
            alt="default avatar"
          />

          {Array.isArray(avatars) && avatars.length === 5 && (
            <>
              {avatars.slice(0, 5).map((avatar, index) => (
                <img
                  key={index}
                  className={cx(`avatar-${index}`)}
                  src={avatar}
                  alt={titles[index] || ""}
                />
              ))}
            </>
          )}
        </div>

        <div className={cx("info")}>
          <h3 className={cx("playlist-name")}>{t("playlistName")}:</h3>
          <h3 className={cx("playlist-name")}>{yourPlaylistName}</h3>

          <h4 className={cx("playlist-description")}>{t("playlistDesc")}:</h4>
          <h4 className={cx("playlist-description")}>
            {yourPlaylistDescription}
          </h4>

          <div className={cx("actions")}>
            <div className={cx("player")}>
              <Player
                onLoop={handleLoop}
                onRandom={handleRandomTrack}
                isRandom={isRandom}
                activeLoopClick={activeLoopClick}
                setActiveLoopClick={setActiveLoopClick}
                activeRandomClick={activeRandomClick}
                setActiveRandomClick={setActiveRandomClick}
                //
                frameYourPlaylist
                playerYourPlaylist
                playerAlbumInfo
                actionsAlbumInfo
                hideAlbumInfo
                spaceAlbumInfo
              />
            </div>

            <div className={cx("functions")}>
              <div className={cx("func")}>
                <FontAwesomeIcon
                  className={cx("edit")}
                  icon={faFilePen}
                  onClick={handleEditClick}
                />
              </div>

              <div className={cx("func")}>
                <FontAwesomeIcon
                  className={cx("remove")}
                  icon={faXmark}
                  onClick={() =>
                    handleDeletePlaylistItem(
                      playlistIndex,
                      currentUserName,
                      currentItemName
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPlaylistInfo;

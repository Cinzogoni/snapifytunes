import classNames from "classnames/bind";
import styles from "./YourPlaylistItem.module.scss";
const cx = classNames.bind(styles);

import defaultAvatar from "~/assets/images/avatar/DefaultAvatar.png";

import { useLangSwitcher } from "~/context/LangSwitcherProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useYourPlaylist } from "../../context/YourPlaylistProvider";
import { useAudioPlayer } from "../../context/AudioPlayerProvider";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

function YourPlaylistItem({
  playlistItem,
  trackId,
  trackAvatar,
  trackTitle,
  trackPerformer,
  trackLink,
  trackGenre,
  releaseDay,
  trackType,
  streamed,
}) {
  const { t } = useLangSwitcher();

  const { setIsRandom, setActiveRandomClick, setShuffledMultipleTrack } =
    useAudioPlayer();

  const {
    handleDeletePlaylistItem,
    handleEditPlaylistItem,
    handleAddAudioTrack,
    setIsNewReleasesVisible,
    setActiveNewReleasesPlaylist,
    setShowNewReleasesPlaylist,
    chooseAudio,
    setChooseAudio,
    showCheckBox,
    setIsEditing,
  } = useYourPlaylist();

  const find = playlistItem.map((c) => c.audioTracks || []);
  const avatars = find.flat().map((a) => a.trackAvatar);

  const handleCheckBox = (index) => {
    if (!trackId) return;

    if (chooseAudio?.trackId === trackId && chooseAudio?.index === index) {
      setChooseAudio(null);
    } else {
      setChooseAudio({ trackId, index });
    }
  };

  const handleAddAudioToPlaylist = (playlistIndex) => {
    if (!trackId || !chooseAudio) return;

    const audioInfo = {
      trackId,
      trackAvatar,
      trackTitle,
      trackPerformer,
      trackLink,
      trackGenre,
      releaseDay,
      trackType,
      streamed,
    };

    handleAddAudioTrack(audioInfo, playlistIndex);
    setChooseAudio(null);
  };

  const currentUserName = playlistItem.map((info) => info.userName);
  const currentItemName = playlistItem.map((info) => info.yourPlaylistName);

  return (
    <div
      className={cx("wrapper")}
      style={{
        display:
          !Array.isArray(playlistItem) || playlistItem.length === 0
            ? "none"
            : "block",
      }}
    >
      {playlistItem.map((item, playlistIndex) => (
        <div key={playlistIndex} className={cx("frame")}>
          {chooseAudio?.trackId === trackId &&
            chooseAudio?.index === playlistIndex && (
              <div className={cx("add-track")}>
                <button
                  style={{
                    fontSize: "1.6rem",
                    color: "rgba(12, 12, 20, 0.8)",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                  onClick={() => handleAddAudioToPlaylist(playlistIndex)}
                >
                  {t("addAudio")}
                </button>
              </div>
            )}

          <div className={cx("box")}>
            <div className={cx("playlist")}>
              <div className={cx("image")}>
                <div className={cx("avatar-frame")}>
                  <img
                    className={cx("default-avatar")}
                    src={defaultAvatar}
                    alt="default avatar"
                  />

                  {avatars && avatars.length >= 5 && (
                    <>
                      {avatars.slice(0, 5).map((avatar, index) => (
                        <img
                          key={index}
                          className={cx(`avatar-${index}`)}
                          src={avatar}
                          alt={
                            item.yourPlaylistName ||
                            item.yourPlaylistDescription ||
                            ""
                          }
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className={cx("info")}>
                <Link
                  className={cx("link")}
                  to={routesConfig.yourPlaylistPage
                    .replace(
                      `:userName`,
                      item.userName?.replace(/\//g, "-") || "defaultUserName"
                    )
                    .replace(
                      `:yourPlaylistName`,
                      item.yourPlaylistName?.replace(/\//g, "-") ||
                        "defaultPlaylistName"
                    )}
                  onClick={() => {
                    setIsRandom(false);
                    setActiveRandomClick(true);
                    setShuffledMultipleTrack([]);
                  }}
                />

                <h5 className={cx("title")}>{item.yourPlaylistName}</h5>
                <h6 className={cx("desc")}>{item.yourPlaylistDescription}</h6>
              </div>

              <div className={cx("actions")}>
                {trackId && showCheckBox && (
                  <div className={cx("check-box")}>
                    <input
                      type="checkbox"
                      className={cx("tick-box")}
                      checked={
                        chooseAudio?.trackId === trackId &&
                        chooseAudio?.index === playlistIndex
                      }
                      onChange={() => handleCheckBox(playlistIndex)}
                    />
                  </div>
                )}

                <div className={cx("action-1")}>
                  <FontAwesomeIcon
                    className={cx("edit")}
                    icon={faFilePen}
                    onClick={() => {
                      handleEditPlaylistItem(
                        item.itemName,
                        item.itemDescription,
                        playlistIndex
                      );
                      setIsNewReleasesVisible(false);
                      setActiveNewReleasesPlaylist(false);
                      setShowNewReleasesPlaylist(false);
                      setIsEditing(true);
                    }}
                  />
                </div>

                <div className={cx("action")}>
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
      ))}
      <div className={cx("divider")}>
        <hr />
      </div>
    </div>
  );
}

export default YourPlaylistItem;

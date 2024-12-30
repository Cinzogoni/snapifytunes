import classNames from "classnames/bind";
import styles from "./PlaylistModeList.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import { useAudioPlayer } from "../../context/AudioPlayerProvider";

import Player from "../Player";

function PlaylistModeList({ multipleTrack, findPlaylistItem }) {
  const { t } = useTranslation();
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    handleLoop,
    handleNextTrack,
    handlePrevTrack,
    handleRandomTrack,
    activeLoopClick,
    setActiveLoopClick,
    activeRandomClick,
    setActiveRandomClick,
    isRandom,
    isTrackEnded,
    setMultipleTrackIndex,
    setMultipleTrack,
    setShuffledMultipleTrack,
    shuffledMultipleTrack,
    setStoredMultipleTrackMap,
    storedMultipleTrackMap,
    storedAudiosMap,
    setStoredAudiosMap,
  } = useAudioPlayer();

  console.log("Playlist mode multipleTrack:", multipleTrack);

  const trackRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const storedTrackArray = useMemo(() => {
    return Array.from(storedMultipleTrackMap.values()).flatMap(
      (item) => item.multipleTrack
    );
  }, [storedMultipleTrackMap]);

  const value = multipleTrack[0];
  const albumAvatar = value?.avatar;

  const podcastStoredAvatar = storedTrackArray.map((a) => a.audioAvatar);
  const podcastListAvatar = multipleTrack.map((a) => a.audioAvatar);

  const yourPlaylistStoredAvatar = storedTrackArray.map((a) => a.trackAvatar);
  const yourPlaylistAvatar = multipleTrack.map((a) => a.trackAvatar);

  const activeAvatar =
    storedTrackArray.length > 0
      ? storedTrackArray[0].avatar || podcastStoredAvatar
      : null;

  const avatarSrc = useMemo(() => {
    if (storedAudiosMap) {
      return activeAvatar || podcastStoredAvatar;
    }
    return albumAvatar || podcastListAvatar;
  }, [
    storedAudiosMap,
    activeAvatar,
    podcastStoredAvatar,
    podcastListAvatar,
    albumAvatar,
  ]);

  const finalAvatarSrc = useMemo(() => {
    return multipleTrack.map((_, index) => {
      return (
        (yourPlaylistAvatar && yourPlaylistAvatar[index]) ||
        (yourPlaylistStoredAvatar && yourPlaylistStoredAvatar[index]) ||
        avatarSrc
      );
    });
  }, [multipleTrack, yourPlaylistAvatar, yourPlaylistStoredAvatar, avatarSrc]);

  useEffect(() => {
    if (multipleTrack.length > 0) {
      setMultipleTrack(multipleTrack);
      if (isRandom) {
        const shuffledList = shuffleArray(multipleTrack);
        setShuffledMultipleTrack(shuffledList);
      } else {
        setShuffledMultipleTrack([]);
      }
    }
  }, [isRandom, setMultipleTrack, setShuffledMultipleTrack]);

  const displayMultipleTrack = isRandom ? shuffledMultipleTrack : multipleTrack;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const index = currentTrackId
      ? displayMultipleTrack.findIndex((track) => track.id === currentTrackId)
      : -1;

    setMultipleTrackIndex(index);

    if (!isScrolling && index !== -1 && trackRefs.current[index]) {
      trackRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // console.log("Track List:", displayMultipleTrack);
    // console.log("current track id:", currentTrackId);
  }, [currentTrackId, displayMultipleTrack, setMultipleTrackIndex]);

  useEffect(() => {
    if (!storedAudiosMap) {
      setStoredAudiosMap(false);
    }

    // console.log("AlbumList storedAudiosMap:", storedAudiosMap);
  }, [storedAudiosMap]);

  const handleTrackPlay = (track) => {
    if (!storedAudiosMap) {
      setStoredMultipleTrackMap(new Map());
      setMultipleTrack(displayMultipleTrack);
    }

    setMultipleTrackIndex(
      displayMultipleTrack.findIndex(
        (t) => t.id || t.trackId === track.id || track.trackId
      )
    );
    handlePlay(
      track.id || track.trackId,
      {
        trackTitle: track.title || track.trackTitle,
        trackPerformer:
          track.stageName || track.publisher || track.trackPerformer,
        trackType: track.type || track.trackType,
      },
      track.link || track.trackLink
    );
    setMultipleTrack(multipleTrack);
  };

  const handleTrackPause = (track) => {
    setMultipleTrackIndex(
      displayMultipleTrack.findIndex(
        (t) => t.id === track.id || t.trackId === track.trackId
      )
    );
    handlePause(track.id || track.trackId);
  };

  const isLastTrack = (track) => {
    return (
      displayMultipleTrack[displayMultipleTrack.length - 1]?.id === track.id
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {!findPlaylistItem && !multipleTrack.length ? (
          <div className={cx("yourPlaylist-null")}>
            <h1 className={cx("yourPlaylist-notify")}>{t("playlistNull")}</h1>
          </div>
        ) : (
          <div className={cx("tracks")}>
            {displayMultipleTrack.map((track, index) => (
              <div
                ref={(el) => (trackRefs.current[index] = el)}
                className={cx("track-box", {
                  playing:
                    track.id === currentTrackId ||
                    track.trackId === currentTrackId,
                  transparent: isTrackEnded && isLastTrack(track),
                })}
                key={track.id || track.trackId}
              >
                <div className={cx("player")}>
                  <img
                    className={cx("track-avatar")}
                    src={finalAvatarSrc[index]}
                    alt={track.title || track.trackTitle}
                  />

                  <Player
                    trackId={track.id || track.trackId}
                    trackLink={track.link || track.trackLink}
                    trackTitle={track.title || track.trackTitle}
                    trackPerformer={
                      track.stageName || track.publisher || track.trackPerformer
                    }
                    trackType={track.type || track.trackType}
                    //
                    isStatus={
                      track.id === currentTrackId ||
                      track.trackId === currentTrackId
                    }
                    onPlay={() => handleTrackPlay(track)}
                    onPause={() => handleTrackPause(track)}
                    onNext={handleNextTrack}
                    onPrev={handlePrevTrack}
                    onLoop={handleLoop}
                    onRandom={handleRandomTrack}
                    isRandom={isRandom}
                    activeLoopClick={activeLoopClick}
                    setActiveLoopClick={setActiveLoopClick}
                    activeRandomClick={activeRandomClick}
                    setActiveRandomClick={setActiveRandomClick}
                    //
                    frameSingleTracks
                    playerSingleTracks
                    waveformBoxSingleTracks
                    actionsAlbumList
                    hideAlbumList
                  />
                </div>

                <div className={cx("track-info")}>
                  <Link
                    className={cx("track-link")}
                    to={
                      track.type === "Podcast"
                        ? routesConfig.podcastAudioPage
                            .replace(
                              `:publisher`,
                              track.publisher.replace(/\//g, "-")
                            )
                            .replace(
                              `:title`,
                              track.title ||
                                track.trackTitle.replace(/\//g, "-")
                            )
                        : routesConfig.track
                            .replace(
                              `:stageName`,
                              track.stageName ||
                                track.trackPerformer.replace(/\//g, "-")
                            )
                            .replace(
                              `:trackTitle`,
                              track.title ||
                                track.trackTitle.replace(/\//g, "-")
                            )
                    }
                  />
                  <h4 className={cx("track-title")}>
                    {track.title || track.trackTitle}
                  </h4>
                  <h5 className={cx("track-performer")}>
                    {track.stageName || track.publisher || track.trackPerformer}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistModeList;

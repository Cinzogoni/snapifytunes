import classNames from "classnames/bind";
import styles from "./YourPlaylistAudiosList.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faLink } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../../context/AudioPlayerProvider";
import { useUser } from "../../context/UserProvider";
import { useStreams } from "~/hooks/useStream";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import Player from "../Player";
import YourPlaylistAudioDelete from "../YourPlaylistAudioDelete";
import { Fragment } from "react";

function YourPlaylistAudiosList({ audioList, playlistIndex }) {
  const { currentUser } = useUser();
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
    storedAudiosMap,
    setStoredAudiosMap,
  } = useAudioPlayer();

  const trackRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const shuffleArray = (array) => {
    const shuffledArray = array.filter(
      (track) => track.trackId !== currentTrackId
    );
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    if (currentTrackId) {
      const currentTrack = array.find(
        (track) => track.trackId === currentTrackId
      );
      if (currentTrack) {
        shuffledArray.unshift(currentTrack);
      }
    }

    return shuffledArray;
  };

  useEffect(() => {
    if (audioList.length > 0) {
      setMultipleTrack(audioList);
      if (isRandom) {
        const shuffledList = shuffleArray(audioList);
        setShuffledMultipleTrack(shuffledList);
      }
    } else {
      setShuffledMultipleTrack([]);
    }
  }, [
    audioList,
    isRandom,
    setMultipleTrack,
    setShuffledMultipleTrack,
    playlistIndex,
  ]);

  const displayMultipleTrack = isRandom ? shuffledMultipleTrack : audioList;

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
      ? displayMultipleTrack.findIndex(
          (track) => track.trackId === currentTrackId
        )
      : -1;

    setMultipleTrackIndex(index);

    if (!isScrolling && index !== -1 && trackRefs.current[index]) {
      trackRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
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
      displayMultipleTrack.findIndex((t) => t.id === track.trackId)
    );
    handlePlay(
      track.trackId,
      {
        trackTitle: track.trackTitle,
        trackPerformer: track.trackPerformer,
        trackType: track.trackType,
      },
      track.trackLink
    );
  };

  const handleTrackPause = (track) => {
    setMultipleTrackIndex(
      displayMultipleTrack.findIndex((t) => t.id === track.trackId)
    );
    handlePause(track.trackId);
  };

  const isLastTrack = (track) => {
    return (
      displayMultipleTrack[displayMultipleTrack.length - 1]?.id ===
      track.trackId
    );
  };

  return (
    <Fragment>
      {currentUser && (
        <div className={cx("container")}>
          <div className={cx("audios")}>
            {displayMultipleTrack.map((audio, index) => (
              <div
                ref={(el) => (trackRefs.current[index] = el)}
                className={cx("audio-box", {
                  playing: audio.trackId === currentTrackId,
                  transparent: isTrackEnded && isLastTrack(audio),
                })}
                key={index}
              >
                <div className={cx("player")}>
                  <img
                    className={cx("avatar")}
                    src={audio.trackAvatar}
                    alt={audio.trackTitle}
                  />
                  <Player
                    trackId={audio.trackId}
                    trackLink={audio.trackLink}
                    trackAvatar={audio.trackAvatar}
                    trackTitle={audio.trackTitle}
                    trackPerformer={audio.trackPerformer}
                    trackType={audio.trackType}
                    //
                    isStatus={audio.trackId === currentTrackId}
                    onPlay={() => handleTrackPlay(audio)}
                    onPause={() => handleTrackPause(audio)}
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

                <div className={cx("info")}>
                  <Link
                    className={cx("link")}
                    to={routesConfig.track
                      .replace(
                        `:stageName`,
                        audio.trackPerformer.replace(/\//g, "-")
                      )
                      .replace(
                        `:trackTitle`,
                        audio.trackTitle.replace(/\//g, "-")
                      )}
                  />

                  <h4 className={cx("title")}>{audio.trackTitle}</h4>
                  <h5 className={cx("performer")}>{audio.trackPerformer}</h5>
                </div>

                <div className={cx("more")}>
                  <div className={cx("streams")}>
                    <FontAwesomeIcon
                      className={cx("listeners")}
                      icon={faHeadphones}
                    />
                    <h5 className={cx("streamed")}>
                      {useStreams(audio.streamed)}
                    </h5>
                  </div>

                  <div className={cx("share")}>
                    <FontAwesomeIcon
                      className={cx("share-link")}
                      icon={faLink}
                    />
                  </div>

                  <div className={cx("delete-audio")}>
                    <YourPlaylistAudioDelete
                      trackId={audio.trackId}
                      audioIndex={index}
                      playlistIndex={playlistIndex}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default YourPlaylistAudiosList;

import classNames from "classnames/bind";
import styles from "./AlbumList.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faLink } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../../context/AudioPlayerProvider";
import { useStreams } from "~/hooks/useStream";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import Player from "../Player";
import YourPlaylistCheck from "../YourPlaylistCheck";
import AudioShareLink from "../AudioShareLink";

function AlbumList({ multipleTrack, avatar }) {
  const {
    currentTrackId,
    isPlaying,
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
    const shuffledArray = array.filter((track) => track.id !== currentTrackId);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    if (currentTrackId) {
      const currentTrack = array.find((track) => track.id === currentTrackId);
      if (currentTrack) {
        shuffledArray.unshift(currentTrack);
      }
    }

    return shuffledArray;
  };

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
  }, [multipleTrack, isRandom, setMultipleTrack, setShuffledMultipleTrack]);

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
      displayMultipleTrack.findIndex((t) => t.id === track.id)
    );
    handlePlay(
      track.id,
      {
        trackTitle: track.title,
        trackPerformer: track.stageName,
        trackType: track.type,
      },
      track.link
    );
  };

  const handleTrackPause = (track) => {
    setMultipleTrackIndex(
      displayMultipleTrack.findIndex((t) => t.id === track.id)
    );
    handlePause(track.id);
  };

  const isLastTrack = (track) => {
    return (
      displayMultipleTrack[displayMultipleTrack.length - 1]?.id === track.id
    );
  };

  // console.log("Album list:", displayMultipleTrack);

  return (
    <div className={cx("container")}>
      <div className={cx("tracks")}>
        {displayMultipleTrack.map((track, index) => (
          <div
            ref={(el) => (trackRefs.current[index] = el)}
            className={cx("track-box", {
              playing: track.id === currentTrackId && isPlaying,
              transparent: isTrackEnded && isLastTrack(track),
            })}
            key={track.id}
          >
            <div className={cx("player")}>
              <img className={cx("avatar")} src={avatar} alt={track.title} />
              <Player
                trackId={track.id}
                trackLink={track.link}
                trackAvatar={track.avatar}
                trackTitle={track.title}
                trackPerformer={track.stageName}
                trackType={track.type}
                //
                isStatus={track.id === currentTrackId}
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
                stopperSingleTracks
                waveformBoxSingleTracks
                actionsAlbumList
                hideAlbumList
              />
            </div>

            <div className={cx("info")}>
              <Link
                className={cx("link")}
                to={routesConfig.track
                  .replace(`:stageName`, track.stageName.replace(/\//g, "-"))
                  .replace(`:trackTitle`, track.title.replace(/\//g, "-"))}
              />

              <h4 className={cx("title")}>{track.title}</h4>
              <h5 className={cx("performer")}>{track.stageName}</h5>
            </div>

            <div className={cx("more")}>
              <div className={cx("streams")}>
                <FontAwesomeIcon
                  className={cx("listeners")}
                  icon={faHeadphones}
                />
                <h5 className={cx("streamed")}>{useStreams(track.streamed)}</h5>
              </div>
              <div className={cx("share")}>
                <AudioShareLink
                  LinkFixSize
                  stageName={track.stageName}
                  trackTitle={track.title}
                  typeURL="track"
                />
              </div>
              <div className={cx("add")}>
                <YourPlaylistCheck
                  trackId={track.id}
                  trackLink={track.link}
                  trackAvatar={track.avatar}
                  trackTitle={track.title}
                  trackPerformer={track.stageName}
                  trackGenre={track.genre}
                  trackType={track.type}
                  streamed={track.streamed}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;

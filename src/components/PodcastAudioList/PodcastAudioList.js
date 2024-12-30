import classNames from "classnames/bind";
import styles from "./PodcastAudioList.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faLink } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../../context/AudioPlayerProvider";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import routesConfig from "~/config/routes";

import Player from "../Player";
import YourPlaylistCheck from "../YourPlaylistCheck";
import AudioShareLink from "../AudioShareLink";

const cx = classNames.bind(styles);
function PodcastAudioList({ audioList }) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    isTrackEnded,
    setMultipleTrackIndex,
    setMultipleTrack,
    setShuffledMultipleTrack,
    shuffledMultipleTrack,
    isRandom,
    setStoredMultipleTrackMap,
    storedAudiosMap,
    setStoredAudiosMap,
  } = useAudioPlayer();
  const { t } = useTranslation();

  const audioRefs = useRef([]);
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
    if (audioList.length > 0) {
      setMultipleTrack(audioList);
      if (isRandom) {
        const shuffledList = shuffleArray(audioList);
        setShuffledMultipleTrack(shuffledList);
      }
    }
  }, [isRandom, setMultipleTrack, setShuffledMultipleTrack]);

  const displayMultipleTrack = isRandom ? shuffledMultipleTrack : audioList;

  const sortedPodcast = displayMultipleTrack.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

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

    if (!isScrolling && index !== -1 && audioRefs.current[index]) {
      audioRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTrackId, displayMultipleTrack, setMultipleTrackIndex]);

  useEffect(() => {
    if (!storedAudiosMap) {
      setStoredAudiosMap(false);
    }

    // console.log("PodcastAudioList storedAudiosMap:", storedAudiosMap);
  }, [storedAudiosMap]);

  const handleTrackPlay = (audio) => {
    if (!storedAudiosMap) {
      setStoredMultipleTrackMap(new Map());
      setMultipleTrack(displayMultipleTrack);
    }

    setMultipleTrackIndex(
      displayMultipleTrack.findIndex((t) => t.id === audio.id)
    );
    handlePlay(
      audio.id,
      {
        trackTitle: audio.title,
        trackPerformer: audio.publisher,
        trackType: audio.type,
      },
      audio.link
    );
  };

  const handleTrackPause = (audio) => {
    setMultipleTrackIndex(
      displayMultipleTrack.findIndex((t) => t.id === audio.id)
    );
    handlePause(audio.id);
  };

  const isLastTrack = (audio) => {
    return (
      displayMultipleTrack[displayMultipleTrack.length - 1]?.id === audio.id
    );
  };

  return (
    <div className={cx("container")}>
      <div className={cx("audios")}>
        {sortedPodcast.map((audio, index) => (
          <div
            ref={(el) => (audioRefs.current[index] = el)}
            className={cx("audio-box", {
              playing: audio.id === currentTrackId,
              transparent: isTrackEnded && isLastTrack(audio),
            })}
            key={audio.id}
          >
            <div className={cx("player")}>
              <img
                className={cx("avatar")}
                src={audio.audioAvatar}
                alt={audio.title}
              />
              <Player
                podcastAudioList={audioList}
                trackId={audio.id}
                trackLink={audio.link}
                trackAvatar={audio.avatarAudio}
                trackTitle={audio.title}
                trackPerformer={audio.publisher}
                trackType={audio.type}
                //
                isStatus={audio.id === currentTrackId}
                onPlay={() => handleTrackPlay(audio)}
                onPause={() => handleTrackPause(audio)}
                //
                frameSingleTracks
                playerSingleTracks
                stopperSingleTracks
                waveformBoxSingleTracks
              />
            </div>

            <div className={cx("info")}>
              <Link
                className={cx("link")}
                to={routesConfig.podcastAudioPage
                  .replace(`:publisher`, audio.publisher.replace(/\//g, "-"))
                  .replace(`:title`, audio.title.replace(/\//g, "-"))}
              />
              <h4 className={cx("title")}>{audio.title}</h4>
              <h5 className={cx("publisher")}>
                {t("publisher")}: {audio.publisher}
              </h5>
              <h5 className={cx("author")}>
                {t("author")}: {audio.author}
              </h5>
            </div>

            <div className={cx("more")}>
              <div className={cx("streams")}>
                <FontAwesomeIcon
                  className={cx("listeners")}
                  icon={faHeadphones}
                />
                <h5 className={cx("streamed")}>
                  {new Intl.NumberFormat().format(audio.streamed || 0)}
                </h5>
              </div>
              <div className={cx("share")}>
                <AudioShareLink
                  stageName={audio.publisher}
                  trackTitle={audio.title}
                  typeURL="podcast"
                />
              </div>
              <div className={cx("add")}>
                <YourPlaylistCheck
                  trackId={audio.id}
                  trackLink={audio.link}
                  trackAvatar={audio.audioAvatar}
                  trackTitle={audio.title}
                  trackPerformer={audio.publisher}
                  trackType={audio.type}
                  streamed={audio.streamed}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PodcastAudioList;

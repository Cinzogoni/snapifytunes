import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

import { useLocation } from "react-router-dom";
import { baseName } from "~/bassName";

const AudioPlayer = createContext();

export function AudioPlayerProvider({ children }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({});
  const [trackLink, setTrackLink] = useState(``);
  const [trackType, setTrackType] = useState("");

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [listeningTime, setListeningTime] = useState(1);
  const [checkListeningTime, setCheckListeningTime] = useState(1);

  const [isTrackEnded, setIsTrackEnded] = useState(false);

  const [trackList, setTrackList] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);

  const [volume, setVolume] = useState(1);

  const [isRandom, setIsRandom] = useState(false);
  const [activeRandomClick, setActiveRandomClick] = useState(true);

  const [isLooping, setIsLooping] = useState(false);
  const [activeLoopClick, setActiveLoopClick] = useState(true);

  const [shuffledTrackList, setShuffledTrackList] = useState([]);
  const [storedTrackListMap, setStoredTrackListMap] = useState(new Map());
  const [activeMemo, setActiveMemo] = useState(false);

  const playerRefs = useRef(null);
  const location = useLocation();

  const isAlbumPage = location.pathname.startsWith(
    `${process.env.NODE_ENV === "production" ? baseName : ""}/albumPage`
  );
  const isPodcastPage = location.pathname.startsWith(
    `${process.env.NODE_ENV === "production" ? baseName : ""}/podcastPage`
  );
  const isPlaylistPage = location.pathname.startsWith(
    `${process.env.NODE_ENV === "production" ? baseName : ""}/playlistPage`
  );
  const isTrackPage = location.pathname.startsWith(
    `${process.env.NODE_ENV === "production" ? baseName : ""}/track`
  );
  const isMusicMakerPage = location.pathname.startsWith(
    `${process.env.NODE_ENV === "production" ? baseName : ""}/musicMakerPage`
  );
  const currentUrl = isAlbumPage || isPodcastPage || isPlaylistPage;

  useEffect(() => {
    if (playerRefs.current) {
      playerRefs.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const player = playerRefs.current;
    if (player) {
      const updateTime = () => {
        if (isPlaying) {
          setListeningTime(player.currentTime);
          setCheckListeningTime((prevTime) => prevTime + 1);
        } else {
          setListeningTime(player.currentTime);
        }
      };
      player.addEventListener("timeupdate", updateTime);
      return () => player.removeEventListener("timeupdate", updateTime);
    }
  }, [isPlaying]);

  useEffect(() => {
    // console.log("Track list: ", trackList);
  }, [trackList, trackIndex]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setIsPlaying(false);
  };

  const handlePlay = (trackId, track, link) => {
    try {
      const player = playerRefs.current;
      const audioLink = link || trackLink;

      if (!player) return;

      if (audioLink !== trackLink) {
        player.src = audioLink;
        player.load();
      }

      setTrackLink(audioLink);
      setCurrentTrack(track);
      setCurrentTrackId(trackId);
      setTrackType(track.type || track.trackType || "Unknown Type");
      setIsTrackEnded(false);
      setIsPlaying(true);
      setIsVideoPlaying(false);
      player.play();

      if (checkListeningTime >= player.duration) {
        setListeningTime(player.currentTime);
        setCheckListeningTime(player.currentTime - 1);
      } else {
        setListeningTime(0);
        setCheckListeningTime(0);
      }
    } catch (stt) {
      console.log(stt);
    }
  };

  const handlePause = () => {
    try {
      const player = playerRefs.current;
      if (player) {
        const currentTime = player.currentTime;
        player.pause();
        setCurrentTime(currentTime);
      }
    } catch (stt) {
      console.log();
    }
  };

  const handleStop = () => {
    try {
      const player = playerRefs.current;
      if (player) {
        player.currentTime = 0;
        player.pause();
      }
      setIsPlaying(false);
    } catch (stt) {
      console.log();
    }
  };

  const handleTrackEnd = () => {
    const player = playerRefs.current;
    const totalDuration = player ? player.duration : 0;

    try {
      if (player) {
        if (isTrackPage || isMusicMakerPage) {
          if (isLooping) {
            player.currentTime = 0;
            setIsPlaying(true);
            setIsTrackEnded(false);
            setListeningTime(0);
            setCheckListeningTime(0);
            player.play();
            // console.log("Single track loop is active!");
          } else {
            player.pause();
            setIsPlaying(false);
            setIsTrackEnded(true);
            // console.log("Single track has ended!");
          }
        } else {
          const listToUse = isRandom ? shuffledTrackList : trackList;

          if (listToUse.length > 0) {
            if (isLooping) {
              handleNextTrack();
              setIsPlaying(true);
              setIsTrackEnded(false);
              player.play();
              // console.log(
              //   isRandom
              //     ? "Shuffled track list loop is active!"
              //     : "Playlist loop is active!"
              // );
            } else {
              player.pause();
              setIsPlaying(false);
              player.currentTime = 0;

              if (trackIndex < listToUse.length - 1) {
                handleNextTrack();
                setIsTrackEnded(false);
                // console.log("The track has ended in the playlist!");
              } else {
                setIsTrackEnded(true);
              }
            }
          } else {
            console.log("No track list, no action taken!");
          }
        }
      }
    } catch (stt) {
      console.log(stt);
    }

    const percentDuration = totalDuration * 0.97;

    if (
      listeningTime >= percentDuration &&
      checkListeningTime >= percentDuration
    ) {
      // BUILDING...
    }
  };

  const handleLoop = () => {
    setIsLooping((prevIsLooping) => {
      const newIsLooping = !prevIsLooping;
      console.log(`Looping is now ${newIsLooping ? "enabled" : "disabled"}.`);
      return newIsLooping;
    });
  };

  const handleNextTrack = () => {
    const listToUse = isRandom ? shuffledTrackList : trackList;
    const nextIndex = (trackIndex + 1) % listToUse.length;
    const nextTrack = listToUse[nextIndex];

    setTrackIndex(nextIndex);
    setCurrentTrackId(nextTrack.id || nextTrack.trackId);
    setCurrentTrack({
      trackTitle: nextTrack.title || nextTrack.trackTitle,
      trackPerformer:
        nextTrack.stageName || nextTrack.publisher || nextTrack.trackPerformer,
      trackType: nextTrack.type || nextTrack.trackType,
    });
    setIsPlaying(true);
    handlePlay(
      nextTrack.id || nextTrack.trackId,
      {
        trackTitle: nextTrack.title || nextTrack.trackTitle,
        trackPerformer:
          nextTrack.stageName ||
          nextTrack.publisher ||
          nextTrack.trackPerformer,
        trackType: nextTrack.type || nextTrack.trackType,
      },
      nextTrack.link || nextTrack.trackLink
    );
    // console.log("Next Track!", nextTrack);
  };

  const handlePrevTrack = () => {
    const listToUse = isRandom ? shuffledTrackList : trackList;
    const prevIndex = (trackIndex - 1 + listToUse.length) % listToUse.length;
    const prevTrack = listToUse[prevIndex];

    setTrackIndex(prevIndex);
    setCurrentTrackId(prevTrack.id || prevTrack.trackId);
    setCurrentTrack({
      trackTitle: prevTrack.title || prevTrack.trackTitle,
      trackPerformer:
        prevTrack.stageName || prevTrack.publisher || prevTrack.trackPerformer,
      trackType: prevTrack.type || prevTrack.trackType,
    });
    setIsPlaying(true);
    handlePlay(
      prevTrack.id || prevTrack.trackId,
      {
        trackTitle: prevTrack.title || prevTrack.trackTitle,
        trackPerformer:
          prevTrack.stageName ||
          prevTrack.publisher ||
          prevTrack.trackPerformer,
        trackType: prevTrack.type || prevTrack.trackType,
      },
      prevTrack.link || prevTrack.trackLink
    );
    // console.log("Prev Track!", prevTrack);
  };

  const handleRandomTrack = () => {
    const newRandomState = !isRandom;
    setIsRandom(newRandomState);
  };

  useEffect(() => {
    if (activeMemo && storedTrackListMap.size > 0) {
      // console.log(storedTrackListMap);
    }
  }, [storedTrackListMap, activeMemo]);

  const handleMemo = () => {
    const newMap = new Map(storedTrackListMap);
    const savedTrackList = newMap.get(currentUrl)?.trackList || [];

    if (activeMemo) {
      if (!newMap.has(currentUrl) || savedTrackList.length <= 1) {
        newMap.set(currentUrl, { trackList: [...trackList] });
      }
      if (JSON.stringify(savedTrackList) !== JSON.stringify(trackList)) {
        setTrackList(savedTrackList);
      }
    } else {
      setTrackList(trackList);
      newMap.set(currentUrl, { trackList: [...trackList] });
    }

    setStoredTrackListMap(newMap);
    setActiveMemo((prev) => !prev);
  };

  return (
    <AudioPlayer.Provider
      value={{
        playerRefs,
        currentTrackId,
        currentTrack,
        trackLink,
        trackType,
        setCurrentTrackId,
        setCurrentTrack,
        setTrackLink,
        setTrackType,
        currentTime,
        duration,
        listeningTime,
        checkListeningTime,
        setCurrentTime,
        setDuration,
        currentTime,
        duration,
        listeningTime,
        checkListeningTime,
        setCurrentTime,
        setDuration,
        isRandom,
        isLooping,
        activeRandomClick,
        activeLoopClick,
        isPlaying,
        setIsRandom,
        setIsLooping,
        setActiveLoopClick,
        setActiveRandomClick,
        handlePlay,
        handlePause,
        handleStop,
        handleLoop,
        handleNextTrack,
        handlePrevTrack,
        handleRandomTrack,
        setIsPlaying,
        storedTrackListMap,
        activeMemo,
        setStoredTrackListMap,
        setActiveMemo,
        handleMemo,
        volume,
        setVolume,
        shuffledTrackList,
        setShuffledTrackList,
        isTrackEnded,
        setIsTrackEnded,
        isVideoPlaying,
        handleVideoPlay,
        trackList,
        trackIndex,
        setTrackList,
        setTrackIndex,
        currentUrl,
      }}
    >
      {children}
      <audio ref={playerRefs} onEnded={handleTrackEnd}>
        <source src={trackLink} type="audio/wav" />
      </audio>
    </AudioPlayer.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayer);
}

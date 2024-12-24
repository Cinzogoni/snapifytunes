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
  const [storedAudiosMap, setStoredAudiosMap] = useState(false);

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
    if (!currentUrl) {
      setIsRandom(false);
      setActiveRandomClick(true);
    }
  }, [location.pathname, currentUrl]);

  useEffect(() => {
    // console.log("track list:", trackList);
  }, [trackList, trackIndex]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setIsPlaying(false);
  };

  const handlePlay = async (trackId, track, link) => {
    try {
      const player = playerRefs.current;
      const audioLink = link || trackLink;

      if (!player) return;

      if (audioLink !== trackLink) {
        player.src = audioLink;
        await player.load();
      }

      setTrackLink(audioLink);
      setCurrentTrack(track);
      setCurrentTrackId(trackId);
      setTrackType(track.type || track.trackType || "Unknown Type");
      setIsTrackEnded(false);
      setIsPlaying(true);
      setIsVideoPlaying(false);
      await player.play();

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
        setIsPlaying(false);
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
        setIsPlaying(false);
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
        const percentDuration = totalDuration * 0.97;

        if (
          listeningTime >= percentDuration &&
          checkListeningTime >= percentDuration
        ) {
          // BUILDING...
        }

        if (!isLooping) {
          if (trackList.length === 1) {
            setIsTrackEnded(true);
          }

          if (trackIndex < trackList.length - 1) {
            handleNextTrack();
          } else {
            setIsTrackEnded(true);
          }
        }

        if (isLooping) {
          if (trackList.length === 1) {
            player.currentTime = 0;
            setIsPlaying(true);
            setIsTrackEnded(false);
            setListeningTime(0);
            setCheckListeningTime(0);
            player.play();
            console.log("Single track loop is active!");
          }
          if (trackList.length > 1) {
            setIsPlaying(true);
            setIsTrackEnded(false);
            setListeningTime(0);
            setCheckListeningTime(0);
            handleNextTrack();
          }
        }
      }
    } catch (stt) {
      console.log(stt);
    }
  };

  const handleLoop = () => {
    setIsLooping((prevIsLooping) => {
      const newIsLooping = !prevIsLooping;
      // console.log(`Looping is now ${newIsLooping ? "enabled" : "disabled"}.`);
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

  const handleStoredAudiosMap = () => {
    const newMap = new Map(storedTrackListMap);
    const savedTrackList = newMap.get(currentUrl)?.trackList || [];

    if (storedAudiosMap) {
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
    setStoredAudiosMap((prev) => !prev);
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
        handleStoredAudiosMap,
        volume,
        setVolume,
        isTrackEnded,
        setIsTrackEnded,
        isVideoPlaying,
        handleVideoPlay,
        trackList,
        trackIndex,
        setTrackList,
        setTrackIndex,
        shuffledTrackList,
        setShuffledTrackList,
        setStoredTrackListMap,
        storedTrackListMap,
        setStoredAudiosMap,
        storedAudiosMap,
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

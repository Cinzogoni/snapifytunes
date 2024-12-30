import { useTrackInfo } from "~/context/TrackInfoProvider";

import { useEffect } from "react";
import PlaylistModeList from "../PlaylistModeList";
import { useAudioPlayer } from "~/context/AudioPlayerProvider";

function PlaylistModeWrapList({
  audioTracks,
  findPlaylistItem,
  yourPlaylistName,
}) {
  const { multipleTrack } = useAudioPlayer();

  const combinedMultipleTrack = [...multipleTrack, ...audioTracks];

  useEffect(() => {
    // console.log(combinedMultipleTrack);
  }, [multipleTrack, audioTracks]);

  return (
    <PlaylistModeList
      multipleTrack={combinedMultipleTrack}
      findPlaylistItem={findPlaylistItem}
      yourPlaylistName={yourPlaylistName}
    />
  );
}

export default PlaylistModeWrapList;

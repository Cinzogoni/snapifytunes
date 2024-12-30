import { useTrackInfo } from "~/context/TrackInfoProvider";
import { useUser } from "../../context/UserProvider";
import { useYourPlaylist } from "../../context/YourPlaylistProvider";

import Track from "../Track";
import PlaylistModeInfo from "../PlaylistModeInfo";
import PlaylistModeWrapList from "../PlaylistModeWrapList";

function PlaylistMode() {
  const { albumName, albumPerformer, topic } = useTrackInfo();
  const { userName, yourPlaylistName } = useUser();
  const { playlistItem, multipleTrack } = useYourPlaylist();

  const trackInfo = {
    albumName,
    albumPerformer,
    topic,
    userName,
    yourPlaylistName,
  };

  const findPlaylistItem = playlistItem.find(
    (item) =>
      item.userName === userName && item.yourPlaylistName === yourPlaylistName
  );

  const audioTracks = findPlaylistItem
    ? findPlaylistItem.audioTracks || []
    : [];

  const defaultTitle =
    albumName ?? topic ?? findPlaylistItem?.yourPlaylistName ?? null;

  // console.log("playlistItem:", playlistItem);
  // console.log("findPlaylistItem:", findPlaylistItem);
  // console.log(audioTracks);
  // console.log(defaultTitle);

  return (
    <Track
      info={<PlaylistModeInfo {...trackInfo} defaultTitle={defaultTitle} />}
      list={
        <PlaylistModeWrapList
          {...trackInfo}
          audioTracks={audioTracks}
          multipleTrack={multipleTrack}
          findPlaylistItem={findPlaylistItem}
          yourPlaylistName={yourPlaylistName}
        />
      }
      PlaylistMode
      wrapperPlaylistMode
      framePlaylistMode
      boxPlaylistMode
    />
  );
}

export default PlaylistMode;

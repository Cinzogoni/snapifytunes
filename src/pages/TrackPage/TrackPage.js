import classNames from "classnames/bind";
import styles from "./TrackPage.module.scss";
const cx = classNames.bind(styles);

import TrackInfo from "~/components/TrackInfo";

import { useParams, useNavigate } from "react-router-dom";
import { useLangSwitcher } from "~/context/LangSwitcherProvider";

import { useTrackInfo } from "~/context/TrackInfoProvider";
import { useAudioPlayer } from "~/context/AudioPlayerProvider";

import Track from "~/components/Track";

import routesConfig from "~/config/routes";
import TrackPageSocial from "~/components/TrackPageSocial";
import { useEffect } from "react";

function TrackPage() {
  const { t } = useLangSwitcher();
  const { multipleTrack } = useAudioPlayer();
  const { musicMaker } = useTrackInfo();
  const { stageName, trackTitle } = useParams();

  const navigate = useNavigate();

  const allTrack = musicMaker.flatMap((maker) => [
    ...(maker.singles?.map((single) => ({
      ...single,
      ...maker,
    })) || []),

    ...(maker.albums?.flatMap(
      (album) =>
        album.tracks?.map((track) => ({
          ...track,
          ...maker,
          albumAvatar: album.albumAvatar,
          albumName: album.albumName,
          albumPerformer: album.albumPerformer,
        })) || []
    ) || []),
  ]);

  const track = allTrack.find(
    (t) => t.stageName === stageName && t.title === trackTitle
  );

  const trackId = track && track.id ? track.id : "";
  const link = track && track.link ? track.link : "";
  const avatar = track.avatar || track.albumAvatar || "";
  const title = track && track.title ? track.title : "";
  const musicMakerName = track && track.stageName ? track.stageName : "";
  const mainMusicMaker =
    track && track.mainMusicMaker ? track.mainMusicMaker : "";
  const trackType = track && track.type ? track.type : "";
  const genre = track && track.genre ? track.genre : "";
  const releaseDay = track && track.releaseDay ? track.releaseDay : "";
  const streamed = track && track.streamed ? track.streamed : "";

  const lyrics = track && track.lyric ? track.lyric.split("\n") : "";

  const handleLink = () => {
    if (!track) return;

    const foundTrack = allTrack.find((t) => t.id === track.id);

    if (foundTrack) {
      const linkToNavigate = foundTrack.albumName
        ? routesConfig.albumPage
            .replace(
              ":albumPerformer",
              foundTrack.albumPerformer.replace(/\//g, "-")
            )
            .replace(":albumName", foundTrack.albumName.replace(/\//g, "-"))
        : routesConfig.musicMakerPage.replace(
            ":stageName",
            foundTrack.makerName.replace(/,/g, "-")
          );

      navigate(linkToNavigate);
    }
  };

  const socialTracks = allTrack.filter(
    (t) =>
      t.stageName !== stageName && t.title !== trackTitle && t.genre === genre
  );

  useEffect(() => {
    // console.log(multipleTrack);
  }, [multipleTrack]);

  return (
    <Track
      info={
        <TrackInfo
          id={trackId}
          link={link}
          avatar={avatar}
          title={title}
          stageName={musicMakerName}
          trackType={trackType}
          genre={genre}
          releaseDay={releaseDay}
          streamed={streamed}
          mainMusicMaker={mainMusicMaker}
          linkTo={handleLink}
        />
      }
      social={<TrackPageSocial socialTracks={socialTracks} />}
      list={
        <div className={cx("lyric")}>
          {lyrics.length > 0 ? (
            lyrics.map((line, index) => (
              <h4 key={index} className={cx("lyric-line")}>
                {line}
              </h4>
            ))
          ) : (
            <h4 className={cx("lyric-line")}>{t("lyricDesc")}</h4>
          )}
        </div>
      }
    />
  );
}

export default TrackPage;

import classNames from "classnames/bind";
import styles from "./AudioInfo.module.scss";
const cx = classNames.bind(styles);

import { useUser } from "../../context/UserProvider";

import Searchbar from "../Searchbar";

import HobbyMoods from "../HobbyMoods";
import HobbyGenres from "../HobbyGenres";

import NewReleases from "../NewReleases";
import TrendingSongs from "../TrendingSongs";
import MusicMaker from "../MusicMaker";
import Album from "../Album";
import Podcast from "../Podcast";
import Moment from "../Moment";

function AudioInfo() {
  const { currentUser } = useUser();

  return (
    <div className={cx("container")}>
      <div className={cx("search")}>
        <Searchbar />
      </div>

      <div className={cx("catalogue")}>
        {currentUser && (
          <>
            <HobbyMoods />
            <HobbyGenres />
          </>
        )}

        <NewReleases />
        <TrendingSongs />
        <MusicMaker />
        <Album />
        <Podcast />
        <Moment />
      </div>
    </div>
  );
}

export default AudioInfo;

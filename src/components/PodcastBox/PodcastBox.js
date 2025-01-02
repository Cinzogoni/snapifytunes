import classNames from "classnames/bind";
import styles from "./PodcastBox.module.scss";
const cx = classNames.bind(styles);

import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";

import { useLangSwitcher } from "~/context/LangSwitcherProvider";

function Podcast({ podcastAvatar, podcastTopic, podcastDescription }) {
  const { t } = useLangSwitcher();
  return (
    <div className={cx("container")}>
      <Link
        className={cx("link")}
        to={routesConfig.podcastPage.replace(`:topic`, podcastTopic)}
      />

      <div className={cx("frame")}>
        <img
          className={cx("avatar")}
          src={podcastAvatar}
          alt={t(`topics.${podcastTopic}`)}
        />

        <div className={cx("desc")}>
          <h5 className={cx("podcast-name")}>{t(`topics.${podcastTopic}`)}</h5>
          <h6 className={cx("podcast-desc")}>
            {t(`description.${podcastDescription}`)}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Podcast;

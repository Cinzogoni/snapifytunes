import classNames from "classnames/bind";
import styles from "./AboutUsPage.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Navigation from "~/components/Navigation";

import { useTranslation } from "react-i18next";

function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <div className={cx("container")}>
      <div className={cx("frame")}>
        <div className={cx("back")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <div className={cx("introduces")}>
          <h2 className={cx("title")}>{t("aboutUs")}</h2>
          <p className={cx("desc")}>
            <strong>SnapifyTunes</strong> {t("aboutUsDesc1")}
          </p>

          <p className={cx("desc")}>
            <strong>SnapifyTunes</strong> {t("aboutUsDesc2")}
          </p>

          <p className={cx("desc")}>
            <strong>SnapifyTunes</strong> {t("aboutUsDesc3")}
          </p>
        </div>
      </div>
      <div className={cx("copy-right")}>
        <h1 className={cx("text")}>
          © 20xx SnapifyTunes. All rights reserved.
        </h1>
        <p className={cx("version")}>Version 1.0.0</p>
      </div>
    </div>
  );
}

export default AboutUsPage;

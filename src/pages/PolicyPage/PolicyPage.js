import classNames from "classnames/bind";
import styles from "./PolicyPage.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Navigation from "~/components/Navigation";

import { useLangSwitcher } from "~/context/LangSwitcherProvider";

function PolicyPage() {
  const { t } = useLangSwitcher();

  return (
    <div className={cx("container")}>
      <div className={cx("frame")}>
        <div className={cx("back")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <h1 className={cx("desc")}>{t("beingUpdated")}</h1>
      </div>
    </div>
  );
}

export default PolicyPage;

import classNames from "classnames/bind";
import styles from "./SidebarSupports.module.scss";
const cx = classNames.bind(styles);

import { Link } from "react-router-dom";

import routesConfig from "~/config/routes";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { useLangSwitcher } from "~/context/LangSwitcherProvider";

function SidebarSupports() {
  const { t } = useLangSwitcher();

  return (
    <div className={cx("supports")}>
      <div className={cx("helps")}>
        <Link to={routesConfig.aboutUs}>
          <h6 className={cx("title")}>{t("aboutUs")}</h6>
        </Link>
        <Link to={routesConfig.helpCenter}>
          <h6 className={cx("title")}>{t("helpCenter")}</h6>
        </Link>
        <Link to={routesConfig.policy}>
          <h6 className={cx("title")}>{t("policy")}</h6>
        </Link>
      </div>

      <LanguageSwitcher />
    </div>
  );
}

export default SidebarSupports;

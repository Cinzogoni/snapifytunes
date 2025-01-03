import classNames from "classnames/bind";
import styles from "./LanguageSwitcher.module.scss";
const cx = classNames.bind(styles);

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import { useLangSwitcher } from "~/context/LangSwitcherProvider";
import Tippy from "@tippyjs/react";

function LanguageSwitcher({ languagesFix, chooseFix, iconFix }) {
  const { currentLanguage, changeLanguage, t } = useLangSwitcher();
  const [visible, setVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1280);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 1280);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowHide = () => {
    setVisible((prev) => !prev);
  };

  return (
    <Tippy
      placement="top"
      interactive
      appendTo={document.body}
      visible={visible}
      onClickOutside={() => setVisible(false)}
      render={(attrs) =>
        visible && (
          <div className={cx("change-lang")} tabIndex={-1} {...attrs}>
            <button
              className={cx("lang")}
              onClick={() => {
                changeLanguage("vi");
                setVisible(true);
              }}
            >
              <h4
                className={cx("choose-lang")}
                style={{
                  color:
                    currentLanguage === "vi"
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.7)",
                  transform:
                    currentLanguage === "vi" ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.01s ease-in-out",
                }}
              >
                Tiếng Việt
              </h4>
            </button>

            <button
              className={cx("lang")}
              onClick={() => {
                changeLanguage("en");
                setVisible(true);
              }}
            >
              <h4
                className={cx("choose-lang")}
                style={{
                  color:
                    currentLanguage === "en"
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.7)",
                  transform:
                    currentLanguage === "en" ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.01s ease-in-out",
                }}
              >
                English
              </h4>
            </button>

            <button
              className={cx("lang")}
              onClick={() => {
                changeLanguage("zh");
                setVisible(true);
              }}
            >
              <h4
                className={cx("choose-lang")}
                style={{
                  color:
                    currentLanguage === "zh"
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.7)",
                  transform:
                    currentLanguage === "zh" ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.01s ease-in-out",
                }}
              >
                中文
              </h4>
            </button>

            <button
              className={cx("lang")}
              onClick={() => {
                changeLanguage("ko");
                setVisible(true);
              }}
            >
              <h4
                className={cx("choose-lang")}
                style={{
                  color:
                    currentLanguage === "ko"
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.7)",
                  transform:
                    currentLanguage === "ko" ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.01s ease-in-out",
                }}
              >
                한국어
              </h4>
            </button>

            <button
              className={cx("lang")}
              onClick={() => {
                changeLanguage("ja");
                setVisible(true);
              }}
            >
              <h4
                className={cx("choose-lang")}
                style={{
                  color:
                    currentLanguage === "ja"
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.7)",
                  transform:
                    currentLanguage === "ja" ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.01s ease-in-out",
                }}
              >
                日本語
              </h4>
            </button>
          </div>
        )
      }
    >
      <button
        className={cx("languages", { languagesFix })}
        onClick={handleShowHide}
      >
        <FontAwesomeIcon className={cx("icon", { iconFix })} icon={faGlobe} />
        <h4 className={cx("choose", { chooseFix })}>
          {isSmallScreen ? `${currentLanguage}` : t("language")}
        </h4>
      </button>
    </Tippy>
  );
}

export default LanguageSwitcher;

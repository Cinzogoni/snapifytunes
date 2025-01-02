import classNames from "classnames/bind";
import styles from "./MusicMakerViewAll.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useTrackInfo } from "~/context/TrackInfoProvider";
import { useSearchFocus } from "~/context/SearchFocusProvider";
import { useLangSwitcher } from "~/context/LangSwitcherProvider";

import Tippy from "@tippyjs/react/headless";
import GridSystem from "~/styles/GridSystem";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import MusicMakerBox from "~/components/MusicMakerBox";
import MusicMakerItems from "~/components/MusicMakerItems";
import Navigation from "~/components/Navigation";

function MusicMakerViewAll() {
  const { musicMaker } = useTrackInfo();
  const { setFocus } = useSearchFocus();
  const { t } = useLangSwitcher();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const maker = musicMaker.map((maker) => ({ ...maker }));

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  const sortedMusicMakers = maker.slice().sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority ? -1 : 1;
    }

    const makerNameA = a.makerName || "";
    const makerNameB = b.makerName || "";

    return makerNameA.localeCompare(makerNameB);
  });

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const filteredResults = musicMaker.filter((item) => {
      const searchLowerCase = debounced.toLowerCase();
      return (
        item.makerName && item.makerName.toLowerCase().includes(searchLowerCase)
      );
    });

    setSearchResult(filteredResults);
  }, [debounced]);

  const handleClear = () => {
    setSearchValue(``);
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleFocus = () => {
    setShowResult(true);
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-bar")}>
        <Tippy
          placement="bottom"
          interactive
          appendTo={document.body}
          visible={showResult && searchResult.length > 0}
          onClickOutside={handleHideResult}
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex={-1} {...attrs}>
              <WrapperPopper>
                {searchResult
                  .filter((item) => item.makerName)
                  .map((item) => (
                    <MusicMakerItems
                      key={item.id}
                      musicMakerAvatar={item.makerAvatar}
                      musicMakerStageName={item.makerName}
                      musicMakerRole={item.role}
                    />
                  ))}
              </WrapperPopper>
            </div>
          )}
        >
          <div className={cx("input")}>
            <input
              ref={inputRef}
              className={cx("search-input")}
              placeholder={t("musicMaker")}
              spellCheck={false}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {!!searchValue && (
              <FontAwesomeIcon
                className={cx("icon")}
                icon={faXmark}
                onClick={handleClear}
              />
            )}
          </div>
        </Tippy>
      </div>

      <div className={cx("container")}>
        <div className={cx("back")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <div className={cx("frame")}>
          <GridSystem rowClass={cx("row-1")}>
            {sortedMusicMakers.map((artist) => (
              <GridSystem
                key={artist.id}
                colClass={cx("col")}
                colL={cx("l-2")}
                colML={cx("ml-2-5")}
                colM={cx("m-3")}
                colSM={cx("sm-3")}
                colS={cx("s-4")}
                colMo={cx("mo-6")}
                colMi={cx("mi-12")}
              >
                <div className={cx("boxes")}>
                  <MusicMakerBox
                    Id={artist.id}
                    makerAvatar={artist.makerAvatar}
                    makerName={artist.makerName}
                    role={artist.role}
                  />
                </div>
              </GridSystem>
            ))}
          </GridSystem>
        </div>
      </div>
    </div>
  );
}

export default MusicMakerViewAll;

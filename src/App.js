import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import MainLayout from "./layouts/MainLayout";
import { Fragment } from "react";
import { publicRouter } from "./router";
import LocationHandler from "./LocationHandler";

import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

import { UserProvider } from "./context/UserProvider";
import { ModalProvider } from "./context/ModalProvider";
import { TrackInfoProvider } from "./context/TrackInfoProvider";
import { AudioPlayerProvider } from "./context/AudioPlayerProvider";
import { SearchFocusProvider } from "./context/SearchFocusProvider";
import { YourPlaylistProvider } from "./context/YourPlaylistProvider";

function AppProviders({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <ModalProvider>
          <TrackInfoProvider>
            <AudioPlayerProvider>
              <SearchFocusProvider>
                <YourPlaylistProvider>{children}</YourPlaylistProvider>
              </SearchFocusProvider>
            </AudioPlayerProvider>
          </TrackInfoProvider>
        </ModalProvider>
      </UserProvider>
    </I18nextProvider>
  );
}

function App() {
  // console.log("ENV:", process.env.NODE_ENV);
  // console.log("Base name:", baseName);
  // console.log("publicRouter:", publicRouter);

  return (
    <Router
      basename={process.env.NODE_ENV === "production" ? "/snapifytunes" : ""}
    >
      <AppProviders>
        <div className={cx("app")}>
          <Routes>
            {publicRouter.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout === null ? Fragment : MainLayout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Fragment>
                      <LocationHandler />
                      <Layout>
                        <Page />
                      </Layout>
                    </Fragment>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </AppProviders>
    </Router>
  );
}

export default App;

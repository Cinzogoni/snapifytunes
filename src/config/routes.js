const routesConfig = {
  home: `/:lang/`,
  aboutUs: `/:lang/aboutUsPage`,
  helpCenter: `/:lang/helpCenter`,
  policy: `/:lang/policyPage`,
  info: `/:lang/info/:name`,
  track: `/:lang/track/:stageName/:trackTitle`,
  musicMakerPage: `/:lang/musicMakerPage/:stageName`,
  albumPage: `/:lang/albumPage/:albumPerformer/:albumName`,
  podcastAudioPage: `/podcastAudioPage/:publisher/:title`,
  podcastPage: `/:lang/podcastPage/:topic`,
  newReleasesViewAll: `/:lang/NewReleasesViewAll`,
  musicMakersViewAll: `/:lang/musicMakersViewAll`,
  albumViewAll: `/:lang/albumViewAll`,
  podcastViewAll: `/:lang/podcastViewAll`,
  momentViewAll: `/:lang/momentViewAll`,
  yourPlaylistPage: `/:lang/yourPlaylistPage/:userName/:yourPlaylistName`,
};

export { routesConfig as default };

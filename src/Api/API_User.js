const API_USER = {
  userList: [
    {
      id: "user1",
      avatar: "",
      userName: "Cinzogoni",
      email: "contactwork.huytc@gmail.com",
      phoneNumber: "0386479893",
      password: "User@001",
      emailVerification: true,
      phoneNumberVerification: true,
      passwordRecoveryCode: "",
      recentTrack: [
        {
          recentId: "",
          recentLink: "",
          recentTitle: "",
          recentPerformer: "",
        },
      ],
      yourPlaylist: [
        { yourPlaylistName: "", yourPlaylistDescription: "", audioTracks: [] },
      ],
      hobbies: [
        {
          hobbyMoods: [],
          hobbyGenres: [
            {
              hobbyHipHop: [],
              hobbyRnB: [],
              hobbyPop: [],
              hobbyDance: [],
              hobbyHouse: [],
              hobbyBallad: [],
            },
          ],
        },
      ],
    },
    {
      id: "user2",
      avatar: "",
      userName: "Trần Văn Quốc Kỳ",
      email: "Kyasd666@gmail.com",
      phoneNumber: "0386479893",
      password: "User@002",
      emailVerification: true,
      phoneNumberVerification: true,
      passwordRecoveryCode: "",
      recentTrack: [
        {
          recentId: "",
          recentLink: "",
          recentTitle: "",
          recentPerformer: "",
        },
      ],
      yourPlaylist: [
        { yourPlaylistName: "", yourPlaylistDescription: "", audioTracks: [] },
      ],
      hobbies: [
        {
          hobbyMoods: [],
          hobbyGenres: [{ hobbyRapHipHop: [] }],
        },
      ],
    },
    {
      id: "user3",
      avatar: "",
      userName: "Brownie Benie",
      email: "Br.benie@gmail.com",
      phoneNumber: "0386479893",
      password: "User@003",
      emailVerification: true,
      phoneNumberVerification: true,
      passwordRecoveryCode: "",
      recentTrack: [
        {
          recentId: "",
          recentLink: "",
          recentTitle: "",
          recentPerformer: "",
        },
      ],
      yourPlaylist: [
        { yourPlaylistName: "", yourPlaylistDescription: "", audioTracks: [] },
      ],
      hobbies: [
        {
          hobbyMoods: [],
          hobbyGenres: [{ hobbyRapHipHop: [] }],
        },
      ],
    },
    {
      id: "user4",
      avatar: "",
      userName: "Tuyền Lâm",
      email: "tuyenlam987@gmail.com",
      phoneNumber: "0386479893",
      password: "User@004",
      emailVerification: true,
      phoneNumberVerification: true,
      passwordRecoveryCode: "",
      recentTrack: [
        {
          recentId: "",
          recentLink: "",
          recentTitle: "",
          recentPerformer: "",
        },
      ],
      yourPlaylist: [
        { yourPlaylistName: "", yourPlaylistDescription: "", audioTracks: [] },
      ],
      hobbies: [
        {
          hobbyMoods: [],
          hobbyGenres: [{ hobbyRapHipHop: [] }],
        },
      ],
    },
    {
      id: "user5",
      avatar: "",
      userName: "Rockoz",
      email: "rockozdanny@gmail.com",
      phoneNumber: "0386479893",
      password: "User@004",
      emailVerification: true,
      phoneNumberVerification: true,
      passwordRecoveryCode: "",
      recentTrack: [
        {
          recentId: "",
          recentLink: "",
          recentTitle: "",
          recentPerformer: "",
        },
      ],
      yourPlaylist: [
        { yourPlaylistName: "", yourPlaylistDescription: "", audioTracks: [] },
      ],
      hobbies: [
        {
          hobbyMoods: [],
          hobbyGenres: [{ hobbyRapHipHop: [] }],
        },
      ],
    },
  ],
  getUser: function () {
    return this.userList;
  },
};

export default API_USER;

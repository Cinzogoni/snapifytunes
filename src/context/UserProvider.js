import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import avatar from "~/assets/images/avatar/DefaultAvatar.png";

import API_USER from "../Api/API_User";

import loadingLogo from "~/assets/images/loading.png";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userName, setUserName] = useState(null);
  const [yourPlaylistName, setYourPlaylistName] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [defaultAvatar, setDefaultAvatar] = useState(avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(
    currentUser?.avatar || defaultAvatar
  );

  const fetchData = useCallback(async () => {
    try {
      const userData = await API_USER.getUser();
      setUser(userData);
    } catch (error) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      selectedAvatar,
      defaultAvatar,
      setSelectedAvatar,
      setDefaultAvatar,
      user,
      error,
      userName,
      setUserName,
      yourPlaylistName,
      setYourPlaylistName,
    }),
    [
      currentUser,
      selectedAvatar,
      defaultAvatar,
      user,
      error,
      userName,
      yourPlaylistName,
    ]
  );

  if (loading) {
    return (
      <div
        style={{
          width: "200px",
          height: "100%",
          margin: "auto",
          transform: "translateY(100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <img style={{ width: "200px", height: "200px" }} src={loadingLogo} />

        <h1
          style={{
            color: "rgba(24, 113, 187, 0.8)",
            fontSize: "2.4rem",
            textAlign: "center",
            marginTop: "48px",
          }}
        >
          from Snapify
        </h1>
      </div>
    );
  }

  // console.log(user);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

import React, { createContext, useState, useContext } from "react";

const SearchFocus = createContext();

export function SearchFocusProvider({ children }) {
  const [focus, setFocus] = useState(false);

  return (
    <SearchFocus.Provider
      value={{
        focus,
        setFocus,
      }}
    >
      {children}
    </SearchFocus.Provider>
  );
}

export function useSearchFocus() {
  return useContext(SearchFocus);
}

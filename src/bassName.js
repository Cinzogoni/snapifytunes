export const baseName =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_URL
    : process.env.REACT_APP_DEV;

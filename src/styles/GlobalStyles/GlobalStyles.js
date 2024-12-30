import "~/styles/GlobalStyles/GlobalStyles.module.scss";
import { memo } from "react";

function GlobalStyles({ children }) {
  return children;
}

export default memo(GlobalStyles);

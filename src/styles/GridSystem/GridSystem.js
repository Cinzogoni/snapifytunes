import styles from "~/styles/GridSystem/GridSystem.module.scss";
import classNames from "classnames/bind";

import { memo } from "react";

const cx = classNames.bind(styles);

function GridSystem({
  children,
  gridClass,
  wideClass,
  rowClass,
  colClass,
  colL,
  colML,
  colM,
  colSM,
  colS,
  colMo,
  colMi,
}) {
  const classes = cx(
    gridClass,
    wideClass,
    rowClass,
    colClass,
    colL,
    colML,
    colM,
    colSM,
    colS,
    colMo,
    colMi
  );

  return <div className={classes}>{children}</div>;
}

export default memo(GridSystem);

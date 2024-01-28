import React from "react";
import classes from "./ToolTipEl.module.css";

const TooltipEl = ({ tooltipText }) => {
  if (!tooltipText) return null;
  return (
    <div className={classes.tooltip}>
      <span className={classes.text}>{tooltipText}</span>
    </div>
  );
};

export default TooltipEl;

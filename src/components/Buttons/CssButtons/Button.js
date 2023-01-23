import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

function CssButtonOutline({
  title,
  onClick,
  backgroundColor,
  textColor,
  margin,
  fontSize,
  padding,
  disabled,
  border,
}) {
  const mobile = useMediaQuery("(max-width:600px)");

  const styles = {
    border: border || "2px solid #D300FF",
    backgroundColor,
    color: textColor,
    padding,
    outlineWidth: "0",
    margin,
    fontsize: mobile ? "0.8rem" : fontSize,
    fontWeight: "bold",
    borderRadius: "10px",
  };

  return (
    <button onClick={onClick} type="button" style={styles} disabled={disabled}>
      {title}
    </button>
  );
}

function CssButtonSolid({
  title,
  onClick,
  backgroundColor,
  textColor,
  margin,
  fontSize,
  padding,
  type,
  disabled,
}) {
  const mobile = useMediaQuery("(max-width:600px)");
  const styles = {
    background: backgroundColor,
    color: textColor,
    padding,
    fontSize: mobile ? "0.8rem" : fontSize,
    outlineWidth: "0",
    margin,
    fontWeight: "bold",
    borderRadius: "10px",
    border: "none",
  };
  return (
    <button
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
      style={styles}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export { CssButtonOutline, CssButtonSolid };

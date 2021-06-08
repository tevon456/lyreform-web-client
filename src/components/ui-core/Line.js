import React from "react";
import Box from "./Box";

/**
 * Draw a horizaontal or vertical line.
 * @prop {string} variant - h for horizontal and v for vertical.
 * @prop {string} thickness - Specified in css units.
 * @prop {string} length - Specified in css units.
 * @prop {string} color - color of the line.
 */
function Line(props) {
  return (
    <Box
      style={{ display: "inline" }}
      bt={`${props.variant === "h" ? props.thickness || "1px" : "none"} solid ${
        props.color
      }`}
      bl={`${props.variant === "v" ? props.thickness || "1px" : "none"} solid ${
        props.color
      }`}
      width={props.variant === "h" ? props.length : "1px"}
      height={props.variant === "v" ? props.length : "1px"}
      {...props}
    />
  );
}

export default Line;

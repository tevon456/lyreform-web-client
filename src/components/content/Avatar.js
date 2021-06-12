import React from "react";
import styled from "styled-components";
/**
 * Avatar image size defaults to small.
 * @prop {string} src: url to avatar image
 * @prop {string} size: size of avatar accepts small, medium, large, huge.
 */
function Avatar({ src, name, alt, borderColor, ...props }) {
  let defaultSize = 30;
  let size = defaultSize;
  let initial = "...";
  let colorIndex = 0;
  let colors = [
    "#2940d3",
    "#390099",
    "#971C59",
    "#FE6960",
    "#FDAF08",
    "#18856B",
  ];
  if (name === undefined) {
    initial = "...";
  } else {
    initial = name.toUpperCase().split("")[0];
    let charIndex = initial.charCodeAt(0) - 65;
    colorIndex = charIndex % colors.length;
  }
  switch (props.size) {
    case "small":
      size = 30;
      break;
    case "medium":
      size = 35;
      break;
    case "large":
      size = 60;
      break;
    case "huge":
      size = 100;
      break;
    default:
      size = defaultSize;
  }
  const StyledAvatar = styled.div`
    overflow: hidden;
    border-radius: 100%;
    border-color: red;
    box-shadow: 0 0 0 1px ${borderColor || "transparent"};
    background-color: ${colors[colorIndex]};
    margin: 2px;
    width: ${size}px;
    height: ${size}px;
    background-image: url("${src}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: var(--text-light);
  `;

  const StyledAvatarWrap = styled.div`
    display: inline-block;
    font-size: ${size > 60
      ? `calc(${size}px - 2.2em)}`
      : `calc(${size}px - 100%)`};
    width: ${size}px;
  `;
  return (
    <>
      <StyledAvatarWrap {...props}>
        <StyledAvatar src={src} alt={alt}>
          {src ? <span style={{ opacity: 0 }}>{initial}</span> : initial}
        </StyledAvatar>
      </StyledAvatarWrap>
    </>
  );
}

/**
 * Used for text alongside an Avatar image eg user's name
 *  @prop {number} yAxis: Controls label height on y-axis
 */
function AvatarLabel(props) {
  const Label = styled.span`
    transform: translateY(${props.yAxis + `px` || `9px`});
    position: absolute;
    padding: 4px;
  `;
  return (
    <>
      {" "}
      <Label>{props.children}</Label> <br />{" "}
    </>
  );
}
export { Avatar, AvatarLabel };

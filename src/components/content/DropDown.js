import React, { useState, useRef } from "react";
import { UICore } from "../";
import { useOnClickOutside } from "../../hooks";
import styled from "styled-components";

function Menu({ x, y, width, items, children, openOnHover, dark, ...rest }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  const onHover = (state) => {
    if (state) {
      toggle();
    } else {
      return null;
    }
  };

  const onLeave = (state) => {
    if (state) {
      toggle();
    } else {
      return null;
    }
  };

  return (
    <UICore.Box
      onMouseEnter={() => onHover(openOnHover)}
      onMouseLeave={() => onLeave(openOnHover)}
      width="max-content"
      pd="0px"
      onClick={() => toggle()}
      {...rest}
    >
      {children}
      {open ? (
        <UICore.Box
          ref={ref}
          mg="0px"
          pd="px"
          pos="absolute"
          z={9}
          style={{
            transform: `translate(${x || "0px"},${y || "0px"})`,
          }}
        >
          <UICore.Box
            style={{
              overflow: "hidden",
              boxShadow:
                "0 2px 2px -1px rgba(152,162,179,.3), 0 1px 5px -2px rgba(152,162,179,.3)",
            }}
            width={width || "max-content"}
            radius="4px"
            height="auto"
            color={dark ? "var(--text-light)" : "var(--text-dark)"}
            border="1px solid #d3dae6"
            mg="0px"
            bg={dark ? "var(--neutral-600)" : "white"}
            pd="4px"
          >
            {items
              ? items.map((d) => (
                  <DropMap
                    key={Math.random()}
                    hoverColor={rest.hoverColor}
                    {...d}
                  />
                ))
              : null}
          </UICore.Box>
        </UICore.Box>
      ) : null}
    </UICore.Box>
  );
}

function DropMap(props) {
  switch (props.type) {
    case "action":
      return (
        <DropDownItem
          cursor="pointer"
          pd="6px 4px"
          mg="0px"
          radius="4px"
          hoverColor={props.hoverColor}
          color="inherit"
        >
          <UICore.Text
            size="rg"
            mt="2px"
            mb="2px"
            weight="400"
            color="inherit"
            {...props}
          >
            {props.text}
          </UICore.Text>
        </DropDownItem>
      );
    case "line":
      return (
        <UICore.Flex align="center">
          <UICore.Line
            mt="4px"
            mb="4px"
            pd="0px"
            thickness="1px"
            variant="h"
            length="100%"
            color="var(--neutral-400)"
          />
        </UICore.Flex>
      );
    case "any":
      return <>{props.component}</>;
    default:
      return null;
  }
}

const DropDownItem = styled(UICore.Box)`
  &:hover {
    background: ${(props) => props.hoverColor || "var(--primary)"};
  }
  &:hover > p {
    color: white;
  }
`;

export default Menu;

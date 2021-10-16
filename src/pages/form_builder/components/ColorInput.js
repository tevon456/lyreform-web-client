import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UICore } from "../../../components/";
import { HexColorPicker } from "react-colorful";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

const StyledInput = styled.input`
  appearance: none;
  width: ${(props) => (props.width ? props.width : "100%")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "initial")};
  padding: 6px 4px;
  transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  box-shadow: rgba(169, 167, 167, 0.43) 0px 0px 0px 1px;
  border:none;
  border-left: 24px solid ${(props) => props.color || "white"};;
  border-radius: 2px;
  margin-top: 8px;
  display inline-block;
  cursor: initial;
  font-weight:200;
  font-size: 14px;
  background: #f0f0f0;

  &:disabled {
    background-color: #ccc;
  }

  &:focus {
    box-shadow: var(--primary) 0px 0px 0px 2px;
  }
`;

const ColorInput = ({
  label,
  disabled,
  mt,
  mb,
  helper,
  helperColor,
  defaultValue,
  onChange,
  ...rest
}) => {
  const ref = useRef();
  const [color, setColor] = useState(defaultValue);

  const handleChange = (e) => {
    setColor(e);
    ref.current.focus();
  };

  useEffect(() => {
    ref.current.value = color;
  }, [color]);
  return (
    <UICore.Box mg="0px" pd="0px" mb={mb} mt={mt} textAlign="left">
      <UICore.Flex justify="space-between" wrap="wrap" align="center">
        <UICore.Text as="label" weight="300">
          {label}
        </UICore.Text>

        <div>
          <Tippy
            placement="right-start"
            theme="light"
            interactive={true}
            content={<HexColorPicker color={color} onChange={handleChange} />}
          >
            <StyledInput
              color={color}
              disabled={disabled}
              {...rest}
              onChange={(e) => {
                onChange(e);
                setColor(e.target.value);
              }}
              onBlur={(e) => {
                onChange(e);
              }}
              ref={ref}
            />
          </Tippy>

          <UICore.Text
            size="sm"
            mt="4px"
            mb="0px"
            weight="300"
            color={helperColor || "var(--text-grey)"}
          >
            {helper}
          </UICore.Text>
        </div>
      </UICore.Flex>
    </UICore.Box>
  );
};

export default ColorInput;

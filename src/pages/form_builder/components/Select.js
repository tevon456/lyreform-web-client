import React from "react";
import styled from "styled-components";
import { UICore } from "../../../components/";

const StyledSelect = styled.select`
  appearance: none;
  width: ${(props) => (props.width ? props.width : "100%")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "initial")};
  padding: 6px 4px;
  transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  border: 1px solid rgba(169, 167, 167, 0.43);
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

const Select = ({
  options,
  label,
  disabled,
  mt,
  mb,
  helper,
  helperColor,
  ...rest
}) => {
  return (
    <UICore.Box mg="0px" pd="0px" mb={mb} mt={mt} textAlign="left">
      <UICore.Flex justify="space-between" wrap="wrap" align="center">
        <UICore.Text as="label">{label}</UICore.Text>{" "}
        <StyledSelect disabled={disabled} {...rest}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>
      </UICore.Flex>
    </UICore.Box>
  );
};

export default Select;

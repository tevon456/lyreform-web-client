import React from "react";
import styled from "styled-components";
import { UICore } from "..";

const StyledInput = styled.input`
  appearance: none;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 0.6875rem 16px;
  transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  border: 1px solid rgb(169, 167, 167);
  border-radius: 4px;
  margin-top: 6px;
  box-shadow: rgba(108, 108, 108, 0.12) 0px 2px 4px 0px,
    inset rgba(108, 108, 108, 0.26) 0px 3px 2px 0px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "initial")};
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
  }

  &:focus {
    box-shadow: var(--primary) 0px 0px 0px 2px;
  }
`;

const Input = ({ label, disabled, mt, mb, helper, helperColor, ...rest }) => {
  return (
    <UICore.Box mg="0px" pd="0px" mb={mb} mt={mt} textAlign="left">
      <UICore.Text as="label">
        {label}
        <StyledInput disabled={disabled} {...rest} />
        <UICore.Text
          size="sm"
          mt="4px"
          mb="0px"
          weight="300"
          color={helperColor || "var(--text-grey)"}
        >
          {helper}
        </UICore.Text>
      </UICore.Text>
    </UICore.Box>
  );
};

export default Input;

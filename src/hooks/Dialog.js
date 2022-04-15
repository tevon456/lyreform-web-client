import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import useOnClickOutside from "./useOnClickOutside";
import { UICore } from "../components";

function Dialog({ open, close, name, width, height, children, blur, ...rest }) {
  const ref = useRef();
  useOnClickOutside(ref, () => close() || null);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <DialogBackground blur={blur}>
        <div ref={ref}>
          <DialogInner
            name={name}
            width={width}
            height={height}
            minWidth="300px"
            close={close}
          >
            {children}
          </DialogInner>
        </div>
      </DialogBackground>
    </div>,
    document.getElementById("portal")
  );
}

function DialogInner({ name, close, width, height, children }) {
  const passFocusToClose = () => {
    document.getElementById("dialog-close").focus();
  };

  return (
    <UICore.Box bg="#fff" radius="4px" pd="0px" pb="6px">
      <UICore.Box
        bg="var(--neutral-100)"
        mg="0px"
        bb="1px solid var(--neutral-300)"
        radius="4px 4px 0px 0px"
        pd="12px"
      >
        <UICore.Flex justify="space-between" align="center">
          <UICore.Text
            mt="0px"
            color="var(--text-dark)"
            weight="bold"
            size="md"
            className="margin-top--none margin-bottom--none"
          >
            {name}
          </UICore.Text>
          <div>
            <UICore.Button
              id="dialog-close"
              width="40px"
              height="30px"
              kind="secondary"
              autoFocus
              mg="0px"
              pd="0px"
              size="sm"
              data-cy="close-dialog"
              onClick={() => close()}
            >
              <UICore.Flex align="center" justify="center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--text-light)"
                  width="20px"
                  height="20px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </UICore.Flex>
            </UICore.Button>
          </div>
        </UICore.Flex>
      </UICore.Box>
      <UICore.Box
        css={`
          &::-webkit-scrollbar {
            width: 10px;
          }
          &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 8px;
          }
          &::-webkit-scrollbar-thumb {
            background: #a2a2a2;
            border-radius: 8px;
          }
          &::-webkit-scrollbar-thumb:hover {
            background: #767676;
          }
        `}
        width={width}
        height={height || "max-content"}
        minWidth="300px"
        maxWidth={width || "max-content"}
        maxHeight="70vh"
        mg="8px"
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        {children}
        <button
          style={{ border: "none", background: "transparent" }}
          onFocusCapture={() => passFocusToClose()}
        />
      </UICore.Box>
    </UICore.Box>
  );
}

const DialogBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 50%);
  backdrop-filter: blur(8px);
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 12;
`;

export default Dialog;

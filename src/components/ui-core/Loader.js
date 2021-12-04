import styled, { keyframes } from "styled-components";
import { UICore } from "..";
import Logo from "../../resources/icons/logo";

const Frames = keyframes`
  0% { left:0px; top:0px;}
  25% { left:70px; top:0px;}
  50% { left:70px; top:0px;}
  75% { left:0px; top:0px;}
`;

const Outer = styled.div`
  width: 100px;
  height: 8px;
  padding: 2px;
  margin-top: 4px;
  border: 2px solid #2c2c34;
  border-radius: 12px;
`;

const Inner = styled.div`
  width: 30px;
  height: 8px;
  border-radius: 12px;
  background-color: #2c2c34;
  position: relative;
  animation-name: ${Frames};
  animation-timing-function: cubic-bezier(0.58, 0.33, 0.44, 0.7);
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

export default function Loader() {
  return (
    <UICore.Flex justify="center" align="center" direction="column">
      <Logo width="28px" height="28px" colorA="#2c2c34" colorB="#2c2c34" />
      <Outer>
        <Inner />
      </Outer>
    </UICore.Flex>
  );
}

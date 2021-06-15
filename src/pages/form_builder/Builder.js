import React from "react";
import { UICore } from "../../components";
import { useNavbar } from "../../hooks";
import Panel from "./components/Panel";
import CanvasList from "./components/CanvasList";
import Toolbar from "./components/Toolbar";

export function Builder() {
  useNavbar(false);

  return (
    <UICore.Box
      pd="0px"
      height="100vh"
      style={{ overflow: "hidden" }}
      bg="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVQYlWN49uzZf2IwwyBS2NXVNejdSLFCAKgycCDuKdMrAAAAAElFTkSuQmCC) repeat;"
    >
      <Toolbar />
      <UICore.Box height="100vh" pd="0px">
        <UICore.Flex align="center">
          <Panel />
          <CanvasList />
        </UICore.Flex>
      </UICore.Box>
    </UICore.Box>
  );
}

import React from "react";
import { UICore } from "../../components";
import { useNavbar } from "../../hooks";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import Select from "./components/Select";
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
          <UICore.Box
            height="100vh"
            width="160px"
            minWidth="130px"
            border="1px solid var(--neutral-300)"
            bg="#FFF"
            pd="8px"
            pt="60px"
            style={{ flexGrow: 1 }}
          >
            <Input label="Label" mb="16px" width="140px" />
            <Input label="Placeholder" mb="16px" width="140px" />
            <Input type="number" label="Max length" mb="16px" width="140px" />
            <Select
              label="Required"
              mb="16px"
              width="150px"
              options={["yes", "no"]}
            />
            <Checkbox baseColor="var(--primary)" label="Required" />

            <UICore.Line
              style={{ display: "block" }}
              variant="h"
              thickness="1px"
              length="94%"
              color="var(--neutral-350)"
            />
          </UICore.Box>
          <UICore.Box
            height="100vh"
            width="100px"
            pd="0px"
            style={{ flexGrow: 8 }}
          />
        </UICore.Flex>
      </UICore.Box>
    </UICore.Box>
  );
}

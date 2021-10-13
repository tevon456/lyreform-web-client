import React, { useState, useEffect, useContext } from "react";
import { UICore } from "../../components";
import { useNavbar } from "../../hooks";
import Panel from "./components/Panel";
import CanvasList from "./components/CanvasList";
import { FormContext } from "./context/FormContext";

export function Builder() {
  useNavbar(false);
  const form = useContext(FormContext);
  const [trigger, setTrigger] = useState(Math.random());
  const [fieldId, setFieldId] = useState();

  const triggerRender = () => {
    setTrigger(Math.random);
  };

  const setFieldTrigger = (id) => {
    setFieldId(id);
  };

  useEffect(() => {
    console.log("Builder: ", form);
    // eslint-disable-next-line
  }, [trigger]);

  return (
    <UICore.Box
      pd="0px"
      height="100vh"
      style={{ overflow: "hidden" }}
      bg="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVQYlWN49uzZf2IwwyBS2NXVNejdSLFCAKgycCDuKdMrAAAAAElFTkSuQmCC) repeat;"
    >
      <UICore.Box height="100vh" pd="0px">
        <UICore.Flex align="center" highlight>
          <Panel form={form} fieldId={fieldId} trigger={triggerRender} />
          <CanvasList
            form={form}
            trigger={triggerRender}
            setField={setFieldTrigger}
          />
        </UICore.Flex>
      </UICore.Box>
    </UICore.Box>
  );
}

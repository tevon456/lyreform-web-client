import React, { useState, useEffect, useContext } from "react";
import { UICore } from "../../components";
import { useNavbar, useRestResponse } from "../../hooks";
import Panel from "./components/Panel";
import CanvasList from "./components/CanvasList";
import { FormContext } from "./context/FormContext";
import { useLocation } from "react-router";
import { Api, Notification } from "../../utils";

export function Builder() {
  useNavbar(false);
  const location = useLocation();
  const form = useContext(FormContext);
  const [trigger, setTrigger] = useState(Math.random());
  const [fieldId, setFieldId] = useState();
  const [initial, setInitial] = useState(false);
  const { data, setData, loading, setLoading } = useRestResponse({});

  const triggerRender = () => {
    setTrigger(Math.random);
    let timestamp = Date.now();
    localStorage.setItem("last_update", timestamp);
    if (localStorage.getItem("last_save") === undefined)
      localStorage.setItem("last_save", timestamp);
  };

  const setFieldTrigger = (id) => {
    setFieldId(id);
  };

  useEffect(() => {
    if (location.state?.formId && initial === false) {
      Api.getForm(location.state?.formId) //TODO allow loading id from url param
        .then((res) => {
          setData(res.data);
          setInitial(true);
          setLoading(false);
        })
        .catch((error) => {
          Notification.danger("An error occurred while loading your form");
          console.log(error);
        });
    }
    setLoading(false);

    // eslint-disable-next-line
  }, [trigger, loading]);

  if (data && initial === false) {
    // form hasn't loaded before so load it onto the model
    form.setIdFromBackend(data.uuid);
    form.loadSchema({ ...data });
  }

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

import React, { useEffect, useState } from "react";
import { Content, Icons, UICore } from "../../components";
import "styled-components/macro";
import { Api, InboxUtil, Lyreform } from "../../utils";
import { useRestResponse } from "../../hooks";
import { PanelMap } from "./components";

export default function Inbox() {
  const {
    loading: formListLoading,
    setLoading: setFormListLoading,
    data: formList,
    setData: setFormList,
  } = useRestResponse([]);
  const { data: responses, setData: setResponses } = useRestResponse([]);
  const [currentForm, setCurrentForm] = useState();
  const [activeId, setActiveId] = useState();

  useEffect(() => {
    Api.getAllForms()
      .then((res) => {
        setFormList(res.data.results);
        setCurrentForm(res.data.results[0]);
        setFormListLoading(false);
      })
      .catch((err) => {
        setFormListLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  if (formListLoading) {
    return (
      <UICore.Flex align="center" justify="center" style={{ height: "80vh" }}>
        <UICore.Loader />
      </UICore.Flex>
    );
  }

  return (
    <UICore.Box pd="0px" mt="52px" width="calc(100vw - 220px)">
      <UICore.Flex>
        <SidePanel
          setResponses={setResponses}
          responses={responses}
          formList={formList}
          currentForm={currentForm}
          setCurrentForm={setCurrentForm}
          setActiveId={setActiveId}
          activeId={activeId}
        />
        <MainPanel activeId={activeId} responses={responses} />
      </UICore.Flex>
    </UICore.Box>
  );
}

function SidePanel({
  activeId,
  responses = [],
  formList = [],
  currentForm = {},
  setCurrentForm = () => {},
  setResponses = () => {},
  setActiveId = () => {},
}) {
  useEffect(() => {
    Api.getFormSubmissions(currentForm?.uuid)
      .then((res) => {
        if (res?.data?.results.length > 0) {
          setResponses(
            InboxUtil.MissingKeys(res?.data?.results, {
              label: "Empty",
              value: "<no response>",
              fieldType: "EMPTY",
            }).reverse()
          );
        } else {
          setResponses([]);
        }
      })
      .catch((err) => {});
    // eslint-disable-next-line
  }, [currentForm]);

  return (
    <UICore.Box
      pd="0px"
      mg="0px"
      ml="16px"
      bg="var(--neutral-100)"
      br="1px solid var(--neutral-400)"
      height="calc(100vh - 52px)"
    >
      <UICore.Flex direction="column">
        <UICore.Box
          width="220px"
          border="1px solid var(--neutral-400)"
          br="none"
          mg="0px"
        >
          <UICore.Flex align="center">
            <Content.DropDown
              width="180px"
              items={formList.map((form) => {
                return {
                  type: "action",
                  text: form?.name,
                  onClick: () => {
                    setCurrentForm(form);
                    setActiveId(null);
                  },
                };
              })}
              x="0px"
              y="12px"
            >
              <UICore.Button fullWidth title="switch form">
                <Icons.SwitchVerticalIcon width="19px" height="19px" />
              </UICore.Button>
            </Content.DropDown>
            <UICore.Space amount={2} />
            <div
              aria-label={currentForm?.name}
              data-balloon-pos="down"
              style={{ maxWidth: "150px" }}
            >
              <UICore.Text mt="0px" mb="0px" className=" truncate">
                {currentForm?.name || "No form selected"}
              </UICore.Text>
            </div>
          </UICore.Flex>
        </UICore.Box>
        <UICore.Box
          height
          css={`
            flex-grow: 1;
            overflow-y: auto;
            height: calc(100vh - 140px);
          `}
        >
          {responses.map((response) => (
            <div
              key={response.id}
              css={`
                margin-bottom: 4px;
                border-radius: 4px;
              `}
            >
              <UICore.Box
                bg={
                  activeId === response.id
                    ? "var(--primary)"
                    : "var(--neutral-100)"
                }
                color={activeId === response.id ? "#fff" : "var(--text-dark)"}
                onClick={() => setActiveId(response?.id)}
                radius="4px"
                pd="4px"
                mb="2px"
                css={`
                  cursor: pointer;
                  font-family: var(--font-secondary), var(--font-fallback);
                  &:hover {
                    box-shadow: 0 0 0px 2px var(--primary);
                  }
                `}
              >
                <UICore.Text mb="2px" mt="6px" weight="600" color="inherit">
                  {response.data[Object.keys(response.data)[0]].value}
                </UICore.Text>
                <UICore.Text
                  size="sm"
                  mt="0px"
                  mb="6px"
                  color="inherit"
                  weight="300"
                >
                  {new Date(response.createdAt).toLocaleString()}
                </UICore.Text>
              </UICore.Box>
              <div className="hl" />
            </div>
          ))}
        </UICore.Box>
      </UICore.Flex>
    </UICore.Box>
  );
}

function MainPanel({ activeId, responses }) {
  let [activeDetails, setActiveDetails] = useState();
  let [responseKeys, setResponseKeys] = useState();
  let utility = new Lyreform().util;

  useEffect(() => {
    setActiveDetails(utility.selectField(responses, "id", activeId)[0]);
    // eslint-disable-next-line
  }, [activeId]);

  useEffect(() => {
    if (activeDetails?.data) {
      setResponseKeys(Object.keys(activeDetails?.data));
    } else {
      setResponseKeys([]);
    }
  }, [activeDetails]);

  return (
    <UICore.Box
      pd="0px"
      mg="0px"
      css={`
        flex-grow: 1;
      `}
    >
      <UICore.Flex direction="column">
        <UICore.Box
          bg="var(--neutral-100)"
          border="1px solid var(--neutral-400)"
          bl="none"
          minHeight="33px"
        >
          <UICore.Flex align="center" justify="flex-end">
            {/* <UICore.Button>New Form</UICore.Button> */}
          </UICore.Flex>
        </UICore.Box>
        <UICore.Box
          css={`
            height: calc(100vh - calc(64px * 2));
            overflow-y: auto;

            &::-webkit-scrollbar {
              width: 12px;
            }

            &::-webkit-scrollbar-track {
              background: #d9d9d9;
            }

            &::-webkit-scrollbar-thumb {
              background-color: #a7a7a7;
              border-radius: 20px;
              border: 2px solid #d9d9d9;
            }

            &::-webkit-scrollbar-thumb:hover {
              background-color: grey;
            }
          `}
        >
          <PanelMap
            responseKeys={responseKeys}
            data={activeDetails?.data}
            details={activeDetails}
          />
        </UICore.Box>
      </UICore.Flex>
    </UICore.Box>
  );
}

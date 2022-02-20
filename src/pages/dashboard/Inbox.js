import React, { useEffect, useState } from "react";
import { Content, Icons, UICore } from "../../components";
import "styled-components/macro";
import { Api, InboxUtil, Lyreform } from "../../utils";
import { useRender, useRestResponse } from "../../hooks";
import { PanelMap } from "./components";
import ReactPaginate from "react-paginate";
import { useHistory, useParams } from "react-router-dom";

export default function Inbox() {
  const {
    loading: formListLoading,
    setLoading: setFormListLoading,
    data: formList,
    setData: setFormList,
  } = useRestResponse([]);
  const { data: responses, setData: setResponses } = useRestResponse([]);
  const [watchResponse, refreshResponse] = useRender();
  const [currentForm, setCurrentForm] = useState();
  const [activeId, setActiveId] = useState();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    Api.getAllForms()
      .then((res) => {
        setFormList(res.data.results);
        if (params.form_id) {
          Api.getForm(params.form_id)
            .then((res2) => {
              setCurrentForm(res2.data);
            })
            .catch((err) => {
              setCurrentForm(res.data.results[0]);
            });
        } else {
          setCurrentForm(res.data.results[0]);
          history.replace(`/dashboard/inbox/${res.data.results[0]?.uuid}`);
        }

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
    <UICore.Box pd="0px" mg="0px" width="auto">
      <UICore.Flex>
        <SidePanel
          setResponses={setResponses}
          responses={responses}
          formList={formList}
          currentForm={currentForm}
          setCurrentForm={setCurrentForm}
          setActiveId={setActiveId}
          activeId={activeId}
          watchResponse={watchResponse}
        />
        <MainPanel
          activeId={activeId}
          responses={responses}
          refreshResponse={refreshResponse}
        />
      </UICore.Flex>
    </UICore.Box>
  );
}

function SidePanel({
  watchResponse,
  activeId,
  responses = [],
  formList = [],
  currentForm = {},
  setCurrentForm = () => {},
  setResponses = () => {},
  setActiveId = () => {},
}) {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    Api.getFormSubmissions(currentForm?.uuid, { limit: 10, page: currentPage })
      .then((res) => {
        if (res?.data?.results.length > 0) {
          setResponses(
            InboxUtil.MissingKeys(res?.data?.results, {
              label: "Empty",
              value: "<no response>",
              fieldType: "EMPTY",
            }).reverse()
          );
          setPageCount(res.data.total_pages);
        } else {
          setResponses([]);
        }
      })
      .catch((err) => {});
    // eslint-disable-next-line
  }, [currentForm, watchResponse, currentPage]);

  return (
    <UICore.Box
      pd="0px"
      mg="0px"
      ml="0px"
      bg="var(--neutral-100)"
      br="1px solid var(--neutral-400)"
      height="100vh"
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
                    history.replace(`/dashboard/inbox/${form.uuid}`);
                  },
                };
              })}
              x="0px"
              y="12px"
            >
              <UICore.Button fullWidth title="switch form">
                <Icons.ChevronDown width="19px" height="19px" />
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
          css={`
            flex-grow: 1;
            overflow-y: auto;
            height: calc(100vh - 190px);
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
        <UICore.Box pd="4px" width="220px" mg="0px">
          <ReactPaginate
            css={`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              list-style-type: none;
              padding: 0 4px;
              li a {
                background: #eaeffb;
                color: var(--primary);
                border-radius: 4px;
                padding: 4px 0.8rem;
                border: var(--primary) 1px solid;
                cursor: pointer;
              }
              li.previous a,
              li.next a,
              li.break a {
                border-color: var(--primary);
              }
              li.active a {
                background-color: #0366d6;
                border-color: transparent;
                color: white;
                min-width: 32px;
              }
              li.disabled a {
                color: var(--neutral-400);
                border-color: var(--neutral-400);
                background: var(--neutral-300);
              }
              li.disable,
              li.disabled a {
                cursor: not-allowed;
              }
            `}
            breakLabel="..."
            nextLabel={<Icons.ArrowRightCircle width="12px" strokeWidth={4} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={0}
            pageCount={pageCount}
            activeClassName="active"
            previousLabel={
              <Icons.ArrowLeftCircle width="12px" strokeWidth={4} />
            }
            renderOnZeroPageCount={null}
          />
        </UICore.Box>
      </UICore.Flex>
    </UICore.Box>
  );
}

function MainPanel({ activeId, responses, refreshResponse }) {
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
            <UICore.Button>New Form</UICore.Button>
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
            refreshResponse={refreshResponse}
            responseKeys={responseKeys}
            data={activeDetails?.data}
            details={activeDetails}
          />
        </UICore.Box>
      </UICore.Flex>
    </UICore.Box>
  );
}

import React from "react";
import { UICore, Content, FormField } from "../../components";
import { DropDown } from "../../components/content";

export default function Home() {
  return (
    <UICore.Page>
      <UICore.Flex align="center" justify="space-between">
        <div>
          <UICore.Flex align="center">
            <FormField.Input placeholder="Search forms" width="400px" />
            <UICore.Box />
            <UICore.Button size="lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20px"
                height="20px"
              >
                <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                  clipRule="evenodd"
                />
              </svg>
              Search
            </UICore.Button>
          </UICore.Flex>
        </div>
        <div>
          {" "}
          <DropDown
            width="200px"
            items={[
              { type: "action", text: "Name" },
              { type: "action", text: "Published:True" },
              { type: "action", text: "Published:False" },
            ]}
            x="0px"
            y="8px"
          >
            <UICore.Button size="lg" kind="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20px"
                height="20px"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter By
            </UICore.Button>
          </DropDown>
        </div>
      </UICore.Flex>
      <UICore.Line
        style={{ display: "block" }}
        variant="h"
        thickness="1px"
        color="var(--neutral-350)"
        length="100%"
        mt="12px"
        mb="48px"
      />
      <DropDown
        width="200px"
        items={[
          { type: "action", text: "Project Settings" },
          { type: "action", text: "Leave Project" },
          { type: "line" },
          { type: "action", text: "Edit" },
          { type: "action", text: "Delete", color: "red" },
        ]}
        x="134px"
        y="-3px"
      >
        <Content.Card width="230px" height="200px" mg="0px">
          <UICore.Flex
            style={{ height: "100%" }}
            direction="column"
            justify="space-between"
          >
            <UICore.Box pd="var(--space-none)">
              <UICore.Text size="md" weight="500" className="margin-top--none">
                Hello World
              </UICore.Text>

              <UICore.Text
                size="sm"
                weight="300"
                color="var(--text-grey)"
                className="margin-top--none"
              >
                12/56/90
              </UICore.Text>
            </UICore.Box>
            <UICore.Box>
              <UICore.Button fullWidth size="sm">
                Open
              </UICore.Button>
            </UICore.Box>
          </UICore.Flex>
        </Content.Card>
      </DropDown>
    </UICore.Page>
  );
}

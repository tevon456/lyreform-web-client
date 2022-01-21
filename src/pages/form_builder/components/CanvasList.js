import React from "react";
import { UICore } from "../../../components";
import Toolbar from "./Toolbar";
import { fieldDescription } from "../helpers/";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function CanvasList({ form, trigger = () => {}, setField }) {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newFields = form.util.moveArrayEntry(
      form.getAllFields(),
      result.source.index,
      result.destination.index
    );
    form.setModel({ ...form.getModel(), fields: newFields });
    trigger();
  };
  return (
    <UICore.Box
      height="107.5vh"
      width="100px"
      pd="0px"
      mg="0px"
      id="canvas-list-area"
      style={{ flexGrow: 8, overflowY: "auto" }}
    >
      <Toolbar form={form} trigger={trigger} setField={setField} />
      <div style={{ paddingTop: "100px" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <UICore.Flex justify="center" align="center" direction="column">
                  <FieldList
                    list={form.getAllFields()}
                    trigger={trigger}
                    form={form}
                    setField={setField}
                  />
                  {provided.placeholder}
                  <UICore.Box mt="10vh" />
                </UICore.Flex>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </UICore.Box>
  );
}

function FieldList({ list, form, trigger = () => {}, setField }) {
  return list.map((item, index) => (
    <FieldBlock
      item={item}
      form={form}
      trigger={trigger}
      index={index}
      setField={setField}
    />
  ));
}

function FieldBlock({ item, form, index, trigger = () => {}, setField }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <UICore.Box
            style={{ display: "block", overflow: "hidden" }}
            minWidth="300px"
            width="500px"
            radius="4px"
            height="max-content"
            minHeight="140px"
            position="relative"
            cursor="grab"
            bg="var(--neutral-200)"
            mb="42px"
            pd="0px"
          >
            <UICore.Box
              bb="2px solid var(--neutral-300)"
              bg={snapshot.isDragging ? "var(--primary)" : "#2A2A2A"}
            >
              <UICore.Flex align="center" justify="space-between">
                <div>
                  <UICore.Flex align="center">
                    <svg
                      style={{ marginRight: "8px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#FFFFFF"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="9" cy="5" r="1" />
                      <circle cx="9" cy="12" r="1" />
                      <circle cx="9" cy="19" r="1" />
                      <circle cx="15" cy="5" r="1" />
                      <circle cx="15" cy="12" r="1" />
                      <circle cx="15" cy="19" r="1" />
                    </svg>
                    <UICore.Text
                      color="var(--text-light)"
                      size="rg"
                      weight="500"
                      mt="4px"
                      mb="4px"
                    >
                      {item.label}
                    </UICore.Text>{" "}
                  </UICore.Flex>
                </div>
                <UICore.Box mg="0px" pd="0px">
                  <UICore.Flex justify="space-around">
                    <UICore.Box
                      onClick={() => {
                        setField(item.id);
                      }}
                      aria-label="Edit"
                      data-balloon-pos="down"
                      as="button"
                      mg="4px"
                      pd="0px 8px"
                      radius="4px"
                      // border="2px solid var(--neutral-100)"
                      color="var(--text-light)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="20px"
                        height="20px"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </UICore.Box>
                    <UICore.Box
                      onClick={() => {
                        let field = form.duplicateField(item.id);
                        setField(field.id);
                        trigger();
                      }}
                      aria-label="Copy"
                      data-balloon-pos="down"
                      as="button"
                      mg="4px"
                      pd="0px 8px"
                      radius="4px"
                      // border="2px solid var(--neutral-100)"
                      color="var(--text-light)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="20px"
                        height="20px"
                      >
                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                      </svg>
                    </UICore.Box>
                    <UICore.Box
                      onClick={() => {
                        form.deleteFieldById(item.id);
                        setField(null);
                        trigger();
                      }}
                      aria-label="Delete"
                      data-balloon-pos="down"
                      as="button"
                      mg="4px"
                      pd="4px 8px"
                      radius="4px"
                      // border="2px solid var(--neutral-100)"
                      color="var(--text-light)"
                    >
                      {" "}
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
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </UICore.Box>
                  </UICore.Flex>
                </UICore.Box>
              </UICore.Flex>
            </UICore.Box>
            <UICore.Box textAlign="left">
              <UICore.Badge color="var(--text-dark)" bg="var(--neutral-400)">
                {item.name.toLowerCase().split("_")[0]}
              </UICore.Badge>

              {item.required && (
                <UICore.Badge color="#fff" bg="#8447ff">
                  required
                </UICore.Badge>
              )}

              <UICore.Text mt="4px" mb="20px" weight="300">
                {fieldDescription(item.field_type)}
              </UICore.Text>

              {item?.options
                ? item.options.map((option) => (
                    <UICore.Box
                      mg="0px"
                      key={option.value}
                      mb="8px"
                      pd="4px"
                      width="270px"
                      radius="4px"
                      bg="#ececec"
                      border="1px solid rgba(0,0,0,.1)"
                    >
                      <UICore.Text
                        className="truncate"
                        width="240px"
                        mb="2px"
                        weight="300"
                        mt="2px"
                        color="var(--text-dark)"
                      >
                        {option.value}
                      </UICore.Text>
                    </UICore.Box>
                  ))
                : null}
            </UICore.Box>
          </UICore.Box>
        </div>
      )}
    </Draggable>
  );
}

import React from "react";
import { UICore } from "../../../components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function CanvasList() {
  const list = [
    { id: "1", content: "1" },
    { id: "2", content: "2" },
    { id: "3", content: "3" },
  ];
  const onDragEnd = (result) => {
    console.log(result);
  };
  return (
    <UICore.Box
      height="100vh"
      width="100px"
      pd="2rem"
      pt="80px"
      style={{ flexGrow: 8, overflowY: "auto" }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <UICore.Flex justify="center" align="center" direction="column">
                <FieldList list={list} />
                {provided.placeholder}
              </UICore.Flex>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </UICore.Box>
  );
}

function FieldList({ list }) {
  return list.map((item, index) => <FieldBlock item={item} index={index} />);
}

function FieldBlock({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <UICore.Box
            style={{ display: "block" }}
            width="300px"
            radius="4px"
            height="60px"
            position="relative"
            cursor="grab"
            bg="var(--neutral-100)"
            border="1px solid var(--neutral-500)"
            mb="18px"
          >
            {item.content}
          </UICore.Box>
        </div>
      )}
    </Draggable>
  );
}

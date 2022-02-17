import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

interface IDraggableCard {
    toDo: string;
    index: number;
    boardId: number;
}

const Card = styled.div<{ isDraggingOver: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
    background-image: ${(props) => (props.isDraggingOver ? "linear-gradient(to right, #b5b5ff, #8acef0);" : "")};
    box-shadow: ${(props) => (props.isDraggingOver ? "2px 2px" : "none")};

    > div:first-child {
        width: 100%;
    }
`;

const DraggableCard = ({ boardId, toDo, index }: IDraggableCard) => {
    return (
        <>
            <Draggable draggableId={boardId + ""} index={index}>
                {(magic, snapshot) => (
                    <>
                        <Card
                            isDraggingOver={snapshot.isDragging}
                            ref={magic.innerRef}
                            {...magic.dragHandleProps}
                            {...magic.draggableProps}
                        >
                            <div>{toDo}</div>
                        </Card>
                    </>
                )}
            </Draggable>
        </>
    );
};

export default React.memo(DraggableCard);

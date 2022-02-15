import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IToDoState, toDoState, toDoChange, testToDo, ITest } from "./Atoms";
import { DragDropContext, Droppable, DropResult, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./Draggable";
import DraggableBoard from "./Board";
import Board from "./Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 3fr);
    width: 100%;
    gap: 10px;
`;

export const saveData = (toDo: IToDoState) => {
    localStorage.setItem("data", JSON.stringify(toDo));
};

export const getData = () => {
    return JSON.parse(localStorage.getItem("data") as any);
};

const AddBoard = styled.div`
    > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        > input {
            height: 20px;
            border: none;
            background-color: transparent;
            /* opacity: 0.7; */
            border-bottom: 3px solid white;
            border-radius: 3px;
            &:focus {
                outline: none;
                /* border: none; */
            }
        }
        > span {
            /* height: 20px; */
            font-size: 20px;
        }
        margin-top: 5px;
    }
    margin-bottom: 10px;
`;

const DeleteToDo = styled.div`
    width: 550px;
    /* max-width: 530px; */
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    /* height: 10px; */
    div:first-child {
        align-items: center;
        text-align: center;
    }
`;

const Check = styled.div`
    width: 100%;
    height: 100px;
`;

const testData = [
    {
        id: 1,
        content: "item 1 content",
        subItems: [
            {
                id: 10,
                content: "SubItem 10 content",
            },
            {
                id: 11,
                content: "SubItem 11 content",
            },
        ],
    },
    {
        id: 2,
        content: "item 2 content",
        subItems: [
            {
                id: 20,
                content: "SubItem 20 content",
            },
            {
                id: 21,
                content: "SubItem 21 content",
            },
        ],
    },
];

const DropableArea = styled.div`
    width: 600px;
    height: 500px;
    margin: 0 auto;
    background-color: white;
    display: flex;
    justify-content: space-between;
`;

const SubDropableArea = styled.div`
    width: 100%;
    height: 400px;
    color: red;
`;

const DragableArea = styled.div`
    width: 45%;
    height: 400px;
    gap: 10px;
    background-color: gray;
`;
const SubDraggableArea = styled.div`
    background-color: blue;
`;

const App = () => {
    const DragEnd = ({ type, destination, source }: DropResult) => {
        if (type === "parent") {
            setToDo((res) => {
                console.log(res, "res");
                const copy = { ...res };
                console.log(copy, "copy");
                return res;
            });
        }
    };
    const [toDo, setToDo] = useRecoilState<ITest>(testToDo);

    return (
        <>
            <DragDropContext onDragEnd={DragEnd}>
                <Droppable droppableId="droppable" type={"parent"}>
                    {(dropProvider) => (
                        <>
                            <DropableArea ref={dropProvider.innerRef} {...dropProvider.droppableProps}>
                                {Object.keys(toDo).map((item, index) => {
                                    return (
                                        <>
                                            <Draggable
                                                key={toDo[item][0].id}
                                                draggableId={toDo[item][0].name}
                                                index={index}
                                            >
                                                {(dragProvider) => (
                                                    <>
                                                        <DragableArea
                                                            ref={dragProvider.innerRef}
                                                            {...dragProvider.draggableProps}
                                                        >
                                                            {toDo[item][0].name}
                                                            <span
                                                                style={{
                                                                    border: "1px solid blue",
                                                                }}
                                                                {...dragProvider.dragHandleProps}
                                                            >
                                                                MOVE
                                                            </span>
                                                            <Droppable
                                                                droppableId={toDo[item][0].id + ""}
                                                                type={"children"}
                                                            >
                                                                {(childPro) => (
                                                                    <>
                                                                        <SubDropableArea ref={childPro.innerRef}>
                                                                            {toDo[item][0].item.map(
                                                                                (subItem, index) => (
                                                                                    <>
                                                                                        <>
                                                                                            <Draggable
                                                                                                key={subItem.id}
                                                                                                draggableId={
                                                                                                    subItem.id + ""
                                                                                                }
                                                                                                index={index}
                                                                                            >
                                                                                                {(provider) => (
                                                                                                    <>
                                                                                                        <SubDraggableArea
                                                                                                            ref={
                                                                                                                provider.innerRef
                                                                                                            }
                                                                                                            {...provider.dragHandleProps}
                                                                                                            {...provider.draggableProps}
                                                                                                        >
                                                                                                            {
                                                                                                                subItem.text
                                                                                                            }
                                                                                                        </SubDraggableArea>
                                                                                                    </>
                                                                                                )}
                                                                                            </Draggable>
                                                                                        </>
                                                                                    </>
                                                                                )
                                                                            )}
                                                                        </SubDropableArea>
                                                                        {childPro.placeholder}
                                                                    </>
                                                                )}
                                                            </Droppable>
                                                        </DragableArea>
                                                    </>
                                                )}
                                            </Draggable>
                                        </>
                                    );
                                })}
                            </DropableArea>
                            {dropProvider.placeholder}
                        </>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default App;

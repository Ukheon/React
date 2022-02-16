import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IToDoState, toDoState, toDoChange, testToDo, ITest } from "./Atoms";
import { DragDropContext, Droppable, DropResult, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Dropable = styled.div`
    width: 600px;
    height: 500px;
    border: 1px solid gray;
    background-color: white;
    justify-content: space-between;
    display: flex;
`;

const Dropable2 = styled.div`
    text-align: center;
    width: 250px;
    height: 500px;
    background-color: ${(props) => props.theme.bdColor};
    border: 1px solid gray;
    color: red;
`;

const App = () => {
    const DragEnd = ({ type, destination, source }: DropResult) => {
        console.log(destination, source);
        if (type === "parent") {
            setToDo((res) => {
                console.log(res, res);
                return res;
            });
        }
    };
    const [toDo, setToDo] = useRecoilState<ITest>(testToDo);

    return (
        <>
            <DragDropContext onDragEnd={DragEnd}>
                <Dropable>
                    {Object.keys(toDo).map((data, index) => {
                        // TODO , DONE 2바퀴
                        console.log(data);
                        return (
                            <Droppable droppableId={data} type="parent">
                                {(provider) => {
                                    return (
                                        <div ref={provider.innerRef}>
                                            <Draggable key={data} index={index} draggableId={data}>
                                                {(provider) => {
                                                    return (
                                                        <Dropable2 ref={provider.innerRef} {...provider.draggableProps}>
                                                            <span {...provider.dragHandleProps}>{data}</span>
                                                            <Droppable droppableId={data}>
                                                                {(prov) => {
                                                                    return (
                                                                        <div ref={prov.innerRef}>
                                                                            {toDo[data][0].item.map((item, index) => {
                                                                                // 각 item을 갯수만큼 반복.
                                                                                return (
                                                                                    <Draggable
                                                                                        key={item.id}
                                                                                        draggableId={item.id + ""}
                                                                                        index={index}
                                                                                    >
                                                                                        {(prov) => {
                                                                                            return (
                                                                                                <div
                                                                                                    ref={prov.innerRef}
                                                                                                    {...prov.dragHandleProps}
                                                                                                    {...prov.draggableProps}
                                                                                                >
                                                                                                    {item.text}
                                                                                                </div>
                                                                                            );
                                                                                        }}
                                                                                    </Draggable>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Droppable>
                                                        </Dropable2>
                                                    );
                                                }}
                                            </Draggable>
                                        </div>
                                    );
                                }}
                            </Droppable>
                        );
                    })}
                </Dropable>
            </DragDropContext>
        </>
    );
};

export default App;

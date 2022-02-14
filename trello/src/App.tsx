import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IToDoState, toDoState } from "./Atoms";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./Draggable";
import DraggableBoard from "./Board";
import Board from "./Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

export const saveData = (toDo: IToDoState) => {
    localStorage.setItem("data", JSON.stringify(toDo));
};

export const getData = () => {
    return JSON.parse(localStorage.getItem("data") as any);
};

function App() {
    const [toDo, setToDo] = useRecoilState(toDoState);
    useEffect(() => {
        setToDo((data) => {
            return getData();
        });
    }, []);
    const onDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) return;
        if (destination.droppableId === source.droppableId) {
            setToDo((boards) => {
                localStorage.setItem("data", JSON.stringify(toDo));
                console.log(JSON.parse(localStorage.getItem("data") as any));
                const copyBoard = [...boards[source.droppableId]];
                copyBoard.splice(source.index, 1);
                copyBoard.splice(destination?.index, 0, boards[source.droppableId][source.index]);
                const res = {
                    ...boards,
                    [source.droppableId]: copyBoard,
                };
                saveData(res);
                return res;
            });
        } else {
            setToDo((boards) => {
                const outBoard = [...boards[source.droppableId]];
                const addBoard = [...boards[destination.droppableId]];
                addBoard.splice(destination.index, 0, boards[source.droppableId][source.index]);
                outBoard.splice(source.index, 1);
                const res = {
                    ...boards,
                    [destination.droppableId]: addBoard,
                    [source.droppableId]: outBoard,
                };
                saveData(res);
                return res;
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDo).map((boardId, index) => (
                        <Board key={boardId} index={index} toDos={toDo[boardId]} boardId={boardId} />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;

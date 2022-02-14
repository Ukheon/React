import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IToDoState, toDoState, toDoChange } from "./Atoms";
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

function App() {
    const [toDo, setToDo] = useRecoilState(toDoState);
    const newBoard = useSetRecoilState(toDoChange);
    const [value, setValue] = useState<string>("");
    useEffect(() => {
        if (getData() !== null) {
            setToDo((data) => {
                return getData();
            });
        }
    }, []);
    const onDragEnd = ({ destination, source }: DropResult) => {
        console.log(destination, source);
        if (destination?.droppableId === "0") {
            setToDo((boards) => {
                const copyBoards = [...boards[source.droppableId]];
                copyBoards.splice(source.index, 1);
                const res = { ...boards, [source.droppableId]: copyBoards };
                saveData(res);
                return res;
            });
            return;
        }
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
    const addBoard = (data: any) => {
        if (value.length <= 0) return;
        const res = {
            ...toDo,
            [value]: [],
        };
        saveData(res);
        newBoard(res);
        setValue("");
    };
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DeleteToDo>
                <Droppable droppableId="0">
                    {(magic) => (
                        <div ref={magic.innerRef}>
                            gg
                            <Draggable draggableId="0" index={0}>
                                {(hole) => (
                                    <>
                                        <AddBoard>
                                            <div>ADD BOARD</div>
                                            <div>
                                                <input type="text" onChange={onChange} value={value}></input>
                                                <span onClick={addBoard}>✖️</span>
                                            </div>
                                        </AddBoard>
                                        <div ref={hole.innerRef} {...hole.dragHandleProps}>
                                            🗑️
                                        </div>
                                    </>
                                )}
                            </Draggable>
                            {/* {magic.placeholder} */}
                        </div>
                    )}
                </Droppable>
            </DeleteToDo>
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

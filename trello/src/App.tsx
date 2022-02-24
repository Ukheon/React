import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoState, toDoChange } from "./Atoms";
import { DragDropContext, Droppable, DropResult, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./Board";
import { findIdx, saveData, getData } from "./utils";

const Button = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100px;
    height: 30px;
    border: 1px solid ${(props) => props.theme.accentColor};
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    background-color: ${(props) => props.theme.accentColor};
    &:hover {
        cursor: pointer;
    }
`;

const Wrapper = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

const Boards = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
`;

const AddBoard = styled.div`
    margin-top: 30px;
    > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        > input {
            color: white;
            height: 20px;
            border: none;
            background-color: transparent;

            border-bottom: 3px solid white;
            border-radius: 3px;
            &:focus {
                outline: none;
                border-color: ${(props) => props.theme.accentColor};
            }
        }
        > span {
            font-size: 20px;
        }
        margin-top: 5px;
    }
    margin-bottom: 10px;
`;

const DeleteToDo = styled.div`
    width: 550px;
    margin: 20px auto;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    div:first-child {
        align-items: center;
        text-align: center;
    }
`;

const DeleteSpace = styled.div`
    height: 30px;
`;

function App() {
    const [toDo, setToDo] = useRecoilState(toDoState);
    const newBoard = useSetRecoilState(toDoChange);
    const [value, setValue] = useState<string>("");



    
    useEffect(() => {
        if (getData() !== null) {
            setToDo(() => {
                return getData();
            });
        }
    }, []);
    const onDragEnd = ({ type, destination, source }: DropResult) => {
        if (!destination) return;
        if (destination.droppableId === "delete") {
            if (type === "parent") {
                setToDo((allData) => {
                    const copy = [...allData];
                    copy.splice(source.index, 1);
                    saveData(copy);
                    return copy;
                });
            }
            setToDo((allData) => {
                let idx: number = findIdx(allData, source.droppableId);
                const copy = [...allData];
                const item = [...allData[idx].item];
                item.splice(source.index, 1);
                const copyTodo = {
                    id: copy[idx].id,
                    name: copy[idx].name,
                    item: item,
                };
                copy.splice(idx, 1);
                copy.splice(idx, 0, copyTodo);
                saveData(copy);
                return copy;
            });
            return;
        }
        if (type === "children") {
            if (destination.droppableId === source.droppableId) {
                setToDo((allData) => {
                    let idx: number = findIdx(allData, destination.droppableId);
                    const copy = [...allData];
                    const item = [...allData[idx].item];
                    const temp = { ...item[source.index] };
                    item.splice(source.index, 1);

                    item.splice(destination.index, 0, temp);
                    const copyTodo = {
                        id: copy[idx].id,
                        name: copy[idx].name,
                        item: item,
                    };
                    copy.splice(idx, 1);
                    copy.splice(idx, 0, copyTodo);
                    saveData(copy);
                    return [...copy];
                });
            } else {
                setToDo((allData) => {
                    let removeIdx: number = findIdx(allData, source.droppableId);
                    const copy = allData.map((data, index) => {
                        if (data.name === source.droppableId) {
                            const temp = [...data.item];
                            temp.splice(source.index, 1);
                            const res = {
                                id: data.id,
                                name: data.name,
                                item: [...temp],
                            };
                            return res;
                        }
                        if (data.name === destination.droppableId) {
                            const temp = [...data.item];
                            temp.splice(destination.index, 0, allData[removeIdx].item[source.index]);
                            const res = {
                                id: data.id,
                                name: data.name,
                                item: [...temp],
                            };
                            return res;
                        }
                        return data;
                    });
                    saveData(copy);
                    return copy;
                });
            }
        } else {
            setToDo((data) => {
                const copy = [...data];
                copy.splice(source.index, 1);
                const temp = data.filter((data) => data.name === source.droppableId);
                copy.splice(destination!.index, 0, temp[0]);
                saveData(copy);
                return copy;
            });
        }
    };
    const addBoard = () => {
        if (value.length <= 0) return;
        if (value.toLowerCase() === "delete") {
            alert("Can`t This name. . . try again");
            setValue("");
            return;
        }
        if (
            toDo.findIndex((data) => {
                return data.name === value;
            }) >= 0
        ) {
            alert("Already Exists.");
            setValue("");
            return;
        }
        const res = [
            ...toDo,
            {
                id: toDo.length,
                name: value,
                item: [],
            },
        ];
        saveData(res);
        newBoard(res);
        setValue("");
    };
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };
    return (
        <>
            <Button
                onClick={() => {
                    if (window.confirm("기본상태로 변경됩니다. 괜찮으십니까?")) {
                        localStorage.removeItem("data");
                        window.location.reload();
                    }
                }}
            >
                RESET
            </Button>
            <DragDropContext onDragEnd={onDragEnd}>
                <AddBoard>
                    <div>
                        <input type="text" placeholder="ADD BOARD" onChange={onChange} value={value}></input>
                        <span onClick={addBoard}>➕</span>
                    </div>
                </AddBoard>
                <DeleteToDo>
                    <Droppable droppableId="delete" type="parent">
                        {(magic) => (
                            <DeleteSpace ref={magic.innerRef}>
                                <Draggable key="delete" draggableId="delete" index={0}>
                                    {(hole) => (
                                        <div ref={hole.innerRef} {...hole.dragHandleProps}>
                                            DELETE🗑️
                                        </div>
                                    )}
                                </Draggable>
                                {magic.placeholder}
                            </DeleteSpace>
                        )}
                    </Droppable>
                </DeleteToDo>
                <Wrapper>
                    <Boards>
                        {toDo.map((data, index) => (
                            <Board key={data.name} id={data.id} index={index} toDos={data.item} boardId={data.name} />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;

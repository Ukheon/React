import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IToDoState, toDoState, toDoChange } from "./Atoms";
import { DragDropContext, Droppable, DropResult, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./Draggable";
import DraggableBoard from "./Board";
import Board from "./Board";
import { findIdx } from "./Board";

export const saveData = (toDo: IToDoState) => {
    localStorage.setItem("data", JSON.stringify(toDo));
};

export const getData = () => {
    return JSON.parse(localStorage.getItem("data") as any);
};
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
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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

    const onDragEnd = ({ type, destination, source }: DropResult) => {
        console.log(destination, source);
        if (!destination) return;
        if (type === "DEFAULT") {
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
                    return copy;
                });
            }
        } else {
            setToDo((data) => {
                const copy = [...data];
                copy.splice(source.index, 1);
                const temp = data.filter((data) => data.name === source.droppableId);
                copy.splice(destination!.index, 0, temp[0]);
                return copy;
            });
        }
    };
    const addBoard = (data: any) => {
        if (value.length <= 0) return;
        if (
            toDo.findIndex((data) => {
                return data.name === value;
            }) >= 0
        ) {
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
        newBoard(res);
        setValue("");
    };
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <AddBoard>
                    <div>
                        <input type="text" placeholder="ADD BOARD" onChange={onChange} value={value}></input>
                        <span onClick={addBoard}>✖️</span>
                    </div>
                </AddBoard>
                <DeleteToDo>
                    <Droppable droppableId="0" type="delete">
                        {(magic) => (
                            <DeleteSpace ref={magic.innerRef} {...magic.droppableProps}>
                                안니용
                                <Draggable draggableId="0" index={0}>
                                    {(hole) => (
                                        <>
                                            <div ref={hole.innerRef} {...hole.dragHandleProps}>
                                                🗑️
                                            </div>
                                        </>
                                    )}
                                </Draggable>
                                {/* <div>🗑️</div> */}
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

const Main = styled.div``;
export default App;

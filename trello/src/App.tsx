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
        console.log(destination, "목적지");
        console.log(source, "이벤트 발생지점");

        if (!destination) return;
        if (type === "DEFAULT") {
        } else {
            setToDo((allData) => {
                return allData;
            });
        }
    };
    const addBoard = (data: any) => {
        if (value.length <= 0) return;
        const res = {
            ...toDo,
            [value]: [
                // {
                //     id: Date.now(),
                //     name: value,
                //     item: [],
                // },
            ],
        };
        console.log(toDo);
        console.log(res, "res");
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
                            {magic.placeholder}
                        </div>
                    )}
                </Droppable>
            </DeleteToDo>
            <Wrapper>
                <Boards>
                    {Object.keys(toDo).map((boardId, index) => {
                        return <Board key={boardId} index={index} toDos={toDo[boardId]} boardId={boardId} />;
                    })}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;

import { Droppable, Id, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DragabbleCard from "./Draggable";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, toDoState, toDoChange, IToDoState } from "./Atoms";
import { useRef } from "react";
import { saveData } from "./App";
import { isPropertySignature } from "typescript";

interface IDropable {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Wrapper = styled.div<IDropable>`
    padding: 5px 10px;
    margin-top: 20px;
    background-color: ${(props) =>
        props.isDraggingOver ? "pink" : props.draggingFromThisWith ? "#caccd0" : props.theme.bdColor};
    cursor: ${(props) => (props.isDraggingOver ? "grab" : "pointer")};
    min-height: 200px;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    transition: background-color 0.3s ease-in;
`;

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
    index: number;
    id: number;
}

const Form = styled.form`
    width: 100%;
    display: flex;
    position: relative;
    > input {
        color: ${(props) => props.theme.textColor};
        margin-top: 10px;
        width: 100%;
        /* height: 30px; */
        font-size: 16px;
        background-color: transparent;
        border: none;
        border-bottom: 3px solid black;
        border-radius: 5px;
        &:focus {
            outline: none;
            border-color: ${(props) => props.theme.accentColor};
        }
    }
    > div {
        position: absolute;
        right: 0px;
        top: 0px;
    }
`;

const DeleteBoard = styled.span<{ flag: boolean }>`
    display: ${(props) => (props.flag ? "none" : "inline-block")};
    /* display: none; */
    position: absolute;
    top: -20px;
    right: 10px;
    z-index: 10;
    width: 20px;
    height: 20px;
    font-size: 30px;
`;

const MoveAble = styled.div<{ flag: boolean }>`
    width: 100%;
    height: 100%;
    > div:first-child {
        text-align: center;
        font-size: 24px;
        border-bottom: 1px solid ${(props) => props.theme.bgColor};
        background-color: ${(props) => (props.flag ? props.theme.accentColor : "transparents")};
        margin-bottom: 10px;
    }
    background-color: ${(props) => props.theme.bdColor};
`;

interface IUseForm {
    [toDo: string]: string;
}

export const findIdx = (toDo: IToDoState[], name: string) => {
    let idx: number = 0;
    for (let i = 0; i < toDo.length; i++) {
        if (toDo[i].name === name) {
            idx = i;
            break;
        }
    }
    return idx;
};

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
    position: fixed;
    width: 100px;
    height: 100px;
    background-color: red;
    top: 80px;
    left: 10px;
`;

function Board({ toDos, boardId, index, id }: IBoardProps) {
    const { register, setValue, handleSubmit } = useForm<IUseForm>();
    const [toDo, setTodo] = useRecoilState(toDoState);
    const changeToDo = useSetRecoilState(toDoChange);
    const onValue = (data: IUseForm) => {
        let idx: number = findIdx(toDo, boardId);
        setTodo((toDo) => {
            let copy = [...toDo];
            const temp = [...toDo[idx].item];
            temp.unshift({
                id: Date.now(),
                text: data[boardId],
            });
            const copytest = {
                id: toDo[idx].id,
                name: toDo[idx].name,
                item: temp,
            };
            copy.splice(idx, 1);
            copy.splice(idx, 0, copytest);
            return copy;
        });
        setValue(boardId, "");
    };
    const deleteBoard = () => {
        // const copyToDo = { ...toDo };
        // delete copyToDo[boardId];
        // saveData(copyToDo);
        // changeToDo(copyToDo);
    };

    return (
        <>
            <Droppable droppableId={boardId} type="parentBoard">
                {(provider, snapshot) => (
                    <Check ref={provider.innerRef}>
                        <Draggable key={boardId} draggableId={boardId} index={index}>
                            {(provider, snapshot) => (
                                <>
                                    <MoveAble
                                        flag={snapshot.isDragging}
                                        ref={provider.innerRef}
                                        {...provider.draggableProps}
                                    >
                                        <div {...provider.dragHandleProps}>{boardId}</div>
                                        <Form onSubmit={handleSubmit(onValue)}>
                                            <input
                                                type="text"
                                                placeholder={"Add Task"}
                                                {...register(boardId, { required: "hi" })}
                                            ></input>
                                            {/* <button>Enter</button> */}
                                        </Form>
                                        <Droppable droppableId={boardId}>
                                            {(magic, snapshot) => (
                                                <Wrapper
                                                    isDraggingOver={snapshot.isDraggingOver}
                                                    draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                                                    ref={magic.innerRef}
                                                    {...magic.droppableProps}
                                                >
                                                    {toDos.map((toDo, index) => (
                                                        <DragabbleCard
                                                            key={toDo.id!}
                                                            boardId={toDo.id!}
                                                            index={index}
                                                            toDo={toDo.text!}
                                                        />
                                                    ))}
                                                </Wrapper>
                                            )}
                                        </Droppable>
                                    </MoveAble>
                                </>
                            )}
                        </Draggable>
                        {provider.placeholder}
                    </Check>
                )}
            </Droppable>
        </>
    );
}

const Check = styled.div`
    /* background-color: red; */
`;

export default Board;

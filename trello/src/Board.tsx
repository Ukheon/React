import { Droppable, Id } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DragabbleCard from "./Draggable";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./Atoms";
import { useRef } from "react";
import { saveData } from "./App";

interface IDropable {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Wrapper = styled.div<IDropable>`
    padding: 5px 10px;
    margin-top: 20px;

    background-color: ${(props) =>
        props.isDraggingOver ? "pink" : props.draggingFromThisWith ? "#caccd0" : props.theme.bdColor};
    min-height: 200px;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    transition: background-color 0.3s ease-in;
    /* > div:first-child {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        font-weight: bold;
    } */
`;

const Main = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.bdColor};
    > div:first-child {
        width: 100%;
        text-align: center;
        font-weight: bold;
        padding: 10px 0;
        border-bottom: 3px outset gray;
        border-image: linear-gradient(to right, #8b8bec, #8acef0);
        border-image-slice: 1;
    }
    display: flex;
    flex-direction: column;
`;

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
    index: number;
}

const Form = styled.form`
    width: 100%;
    > button {
        width: 100%;
    }
`;

interface IUseForm {
    [toDo: string]: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
    const { register, setValue, handleSubmit } = useForm<IUseForm>();
    const [toDo, setTodo] = useRecoilState(toDoState);

    const onValue = (data: IUseForm) => {
        const newToDo = {
            id: Date.now(),
            text: data[boardId],
        };
        setTodo((toDo) => {
            const res = { ...toDo, [boardId]: [...toDo[boardId], newToDo] };
            saveData(res);
            return res;
        });
        setValue(boardId, "");
    };
    return (
        <>
            <Main>
                <div>{boardId}</div>
                <Form onSubmit={handleSubmit(onValue)}>
                    <input
                        type="text"
                        placeholder={"input your schedule"}
                        {...register(boardId, { required: "hi" })}
                    ></input>
                    <button>Enter</button>
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
                                <DragabbleCard key={toDo.id} boardId={toDo.id} index={index} toDo={toDo.text} />
                            ))}
                            {magic.placeholder}
                        </Wrapper>
                    )}
                </Droppable>
            </Main>
        </>
    );
}
export default Board;

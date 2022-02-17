import { Droppable, Id, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DragabbleCard from "./Draggable";
import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "./Atoms";
import { saveData } from "./utils";
import { findIdx } from "./utils";

interface IDropable {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
    index: number;
    id: number;
}

interface IUseForm {
    [toDo: string]: string;
}

const Wrapper = styled.div<IDropable>`
    z-index: 10;
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

const Form = styled.form`
    width: 100%;
    display: flex;
    position: relative;
    > input {
        color: ${(props) => props.theme.textColor};
        margin-top: 10px;
        width: 100%;
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

function Board({ toDos, boardId, index, id }: IBoardProps) {
    const { register, setValue, handleSubmit } = useForm<IUseForm>();
    const [toDo, setTodo] = useRecoilState(toDoState);
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
            saveData(copy);
            return copy;
        });
        setValue(boardId, "");
    };
    return (
        <Main>
            <Droppable droppableId={boardId} type="parent">
                {(provider) => (
                    <>
                        <Check ref={provider.innerRef} {...provider.droppableProps}>
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
                                            </Form>
                                            <Droppable droppableId={boardId} type="children">
                                                {(magic, snapshot) => (
                                                    <>
                                                        <Wrapper
                                                            isDraggingOver={snapshot.isDraggingOver}
                                                            draggingFromThisWith={Boolean(
                                                                snapshot.draggingFromThisWith
                                                            )}
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
                                                            {magic.placeholder}
                                                        </Wrapper>
                                                    </>
                                                )}
                                            </Droppable>
                                        </MoveAble>
                                    </>
                                )}
                            </Draggable>
                        </Check>
                        {provider.placeholder}
                    </>
                )}
            </Droppable>
        </Main>
    );
}

const Main = styled.div`
    width: 230px;
`;

const Check = styled.div`
    width: 100%;
    /* z-index: ; */
    max-width: 230px;
    background-color: red;
`;

export default Board;

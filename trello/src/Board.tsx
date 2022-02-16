import { Droppable, Id, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DragabbleCard from "./Draggable";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, toDoState, toDoChange } from "./Atoms";
import { useRef } from "react";

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
    position: relative;
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
        width: 100%;
        background-color: transparent;
        border-bottom: 1px grid red;
        border-color: white;
        background-color: white;
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

const MoveAble = styled.div`
    width: 100%;
    /* height: 100%; */
    color: red;
    background-color: ${(props) => props.theme.bdColor};
`;

interface IUseForm {
    [toDo: string]: string;
}

function Board({ toDos, boardId, index, id }: IBoardProps) {
    const { register, setValue, handleSubmit } = useForm<IUseForm>();
    const [toDo, setTodo] = useRecoilState(toDoState);
    const changeToDo = useSetRecoilState(toDoChange);
    const onValue = (data: IUseForm) => {
        console.log(data[boardId]);
        const time = Date.now();
        const newToDo = {
            id: time,
            name: boardId,
            item: [
                {
                    id: time + 1,
                    text: data[boardId],
                },
            ],
        };
        setTodo((toDo) => {
            console.log(toDo);
            let idx: number;
            for (let i = 0; i < toDo.length; i++) {
                if (toDo[i].name === boardId) {
                    idx = i;
                }
            }
            const copy = toDo.filter((data) => data.name !== boardId);
            const temp = toDo.filter((data) => data.name === boardId);
            const test = [...temp[0].item];
            test.unshift({
                id: time + 1,
                text: data[boardId],
            });
            const newToDo = {
                id: id,
                name: boardId,
                item: test,
            };
            //     {
            //     id: 3,
            //     name: "DONE",
            //     item: [
            //         {
            //             id: 2,
            //             text: "hi",
            //         },
            //     ],
            // },
            return [...toDo];
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
            {/* <Main> */}
            <Droppable droppableId={boardId} direction="horizontal" type="parentBoard">
                {(provider) => (
                    <div ref={provider.innerRef}>
                        <Draggable key={boardId} draggableId={boardId} index={index}>
                            {(provider) => (
                                <MoveAble
                                    ref={provider.innerRef}
                                    {...provider.dragHandleProps}
                                    {...provider.draggableProps}
                                >
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
                                                {toDos.length > 0
                                                    ? toDos.map((toDo, index) => (
                                                          <DragabbleCard
                                                              key={toDo.id!}
                                                              boardId={toDo.id!}
                                                              index={index}
                                                              toDo={toDo.text!}
                                                          />
                                                      ))
                                                    : ""}
                                                {magic.placeholder}
                                            </Wrapper>
                                        )}
                                    </Droppable>
                                </MoveAble>
                            )}
                        </Draggable>
                    </div>
                )}
            </Droppable>
            {/* <div>{boardId}</div>
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
                </Droppable> */}
            {/* </Main> */}
            {/* <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <> */}
            {/* <MoveAble {...magic.droppableProps} ref={magic.innerRef}>
                                <Draggable draggableId={boardId} index={index}>
                                    {(dragProvider) => (
                                        <>
                                            <div ref={dragProvider.innerRef} {...dragProvider.draggableProps}>
                                                {boardId}
                                            </div>
                                            <DeleteBoard
                                                onClick={deleteBoard}
                                                flag={boardId === "TO DO" || boardId === "DONE" || boardId === "DOING"}
                                            >
                                                🔥
                                            </DeleteBoard>
                                            <Form onSubmit={handleSubmit(onValue)}>
                                                <input
                                                    type="text"
                                                    placeholder={"input your schedule"}
                                                    {...register(boardId, { required: "hi" })}
                                                ></input>
                                                <div onClick={handleSubmit(onValue)}>✖️</div>
                                                <button>Enter</button>
                                            </Form>
                                            <Droppable droppableId={boardId + index}>
                                                {(dropProvider, snapshot) => (
                                                    <Wrapper
                                                        isDraggingOver={snapshot.isDraggingOver}
                                                        draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                                                        ref={dropProvider.innerRef}
                                                        {...dropProvider.droppableProps}
                                                    >
                                                        {toDos.map((toDo, index) => (
                                                            <DragabbleCard
                                                                key={toDo.id}
                                                                boardId={toDo.id}
                                                                index={index}
                                                                toDo={toDo.text}
                                                            />
                                                        ))}
                                                        {dropProvider.placeholder}
                                                    </Wrapper>
                                                )}
                                            </Droppable>
                                        </>
                                    )}
                                </Draggable>
                            </MoveAble> */}
            {/* </>
                )}
            </Droppable> */}
        </>
    );
}
export default Board;

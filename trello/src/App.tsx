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

// const App = () => {
//     const DragEnd = (event: DropResult) => {};
//     return (
//         <>
//             <DragDropContext onDragEnd={DragEnd}>
//                 <Droppable droppableId="droppable" type={"parent"}>
//                     {(dropProvider) => (
//                         <>
//                             <DropableArea ref={dropProvider.innerRef} {...dropProvider.droppableProps}>
//                                 {testData.map((item, index) => {
//                                     return (
//                                         <>
//                                             <Draggable key={item.id} draggableId={item.id + ""} index={index}>
//                                                 {(dragProvider) => (
//                                                     <>
//                                                         <DragableArea
//                                                             ref={dragProvider.innerRef}
//                                                             {...dragProvider.draggableProps}
//                                                         >
//                                                             {item.content}
//                                                             <span
//                                                                 style={{
//                                                                     border: "1px solid blue",
//                                                                 }}
//                                                                 {...dragProvider.dragHandleProps}
//                                                             >
//                                                                 MOVE
//                                                             </span>
//                                                             <Droppable droppableId={item.id + ""} type={"children"}>
//                                                                 {(childPro) => (
//                                                                     <>
//                                                                         <SubDropableArea ref={childPro.innerRef}>
//                                                                             {item.subItems.map((subItem, index) => (
//                                                                                 <>
//                                                                                     <>
//                                                                                         <Draggable
//                                                                                             key={subItem.id}
//                                                                                             draggableId={
//                                                                                                 subItem.id + ""
//                                                                                             }
//                                                                                             index={index}
//                                                                                         >
//                                                                                             {(provider) => (
//                                                                                                 <>
//                                                                                                     <SubDraggableArea
//                                                                                                         ref={
//                                                                                                             provider.innerRef
//                                                                                                         }
//                                                                                                         {...provider.dragHandleProps}
//                                                                                                         {...provider.draggableProps}
//                                                                                                     >
//                                                                                                         {
//                                                                                                             subItem.content
//                                                                                                         }
//                                                                                                     </SubDraggableArea>
//                                                                                                 </>
//                                                                                             )}
//                                                                                         </Draggable>
//                                                                                     </>
//                                                                                 </>
//                                                                             ))}
//                                                                         </SubDropableArea>
//                                                                     </>
//                                                                 )}
//                                                             </Droppable>
//                                                         </DragableArea>
//                                                     </>
//                                                 )}
//                                             </Draggable>
//                                         </>
//                                     );
//                                 })}
//                             </DropableArea>
//                         </>
//                     )}
//                 </Droppable>
//             </DragDropContext>
//         </>
//     );
// };

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
        // console.log(event);
        if (!destination) return;
        if (type === "DEFAULT") {
            setToDo((data) => {
                console.log(data, "data");
                const copy = [...data];
                const temp = data.filter((data) => data.name === source.droppableId);
                // temp 에는 옮기는애가 담겨있다.
                console.log(temp, "temp");
                console.log(temp[0].name);
                return data;
            });
        } else {
            setToDo((data) => {
                const copy = [...data];
                copy.splice(source.index, 1);
                const temp = data.filter((data) => data.name === source.droppableId);
                copy.splice(destination!.index, 0, temp[0]);
                return copy;
            });
        }
        // if (destination?.droppableId === "0") {
        //     setToDo((boards) => {
        //         const copyBoards = [...boards[source.droppableId]];
        //         copyBoards.splice(source.index, 1);
        //         const res = { ...boards, [source.droppableId]: copyBoards };
        //         saveData(res);
        //         return res;
        //     });
        //     return;
        // }
        // if (!destination) return;
        // if (destination.droppableId === source.droppableId) {
        //     setToDo((boards) => {
        //         localStorage.setItem("data", JSON.stringify(toDo));
        //         console.log(JSON.parse(localStorage.getItem("data") as any));
        //         const copyBoard = [...boards[source.droppableId]];
        //         copyBoard.splice(source.index, 1);
        //         copyBoard.splice(destination?.index, 0, boards[source.droppableId][source.index]);
        //         const res = {
        //             ...boards,
        //             [source.droppableId]: copyBoard,
        //         };
        //         saveData(res);
        //         return res;
        //     });
        // } else {
        //     setToDo((boards) => {
        //         const outBoard = [...boards[source.droppableId]];
        //         const addBoard = [...boards[destination.droppableId]];
        //         addBoard.splice(destination.index, 0, boards[source.droppableId][source.index]);
        //         outBoard.splice(source.index, 1);
        //         const res = {
        //             ...boards,
        //             [destination.droppableId]: addBoard,
        //             [source.droppableId]: outBoard,
        //         };
        //         saveData(res);
        //         return res;
        //     });
        // }
    };
    const addBoard = (data: any) => {
        if (value.length <= 0) return;
        const str = value;
        const res = [
            ...toDo,
            {
                id: Date.now(),
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
                            {/* {magic.placeholder} */}
                        </div>
                    )}
                </Droppable>
            </DeleteToDo>
            <Wrapper>
                <Boards>
                    {toDo.map((data, index) => (
                        // toDos = [ { id, text}] 를 주는중.
                        <Board key={data.name} index={index} toDos={data.item!} boardId={data.name} />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;

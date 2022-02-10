import { IForm, toDoState, toDoSelector, Categories } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
const ToDo = ({ id, text, category }: IForm) => {
    const setToDos = useSetRecoilState(toDoState);
    const onClickEvt = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        if (name === "Delete") {
            setToDos((data) => {
                const targetIndex = data.findIndex((todo) => todo.id === id);
                localStorage.removeItem("toDos");
                localStorage.setItem(
                    "toDos",
                    JSON.stringify([...data.slice(0, targetIndex), ...data.slice(targetIndex + 1)])
                );
                return [...data.slice(0, targetIndex), ...data.slice(targetIndex + 1)];
            });
            return;
        }
        setToDos((data) => {
            const targetIndex = data.findIndex((todo) => todo.id === id);
            const newTodo = { text, id, category: name as any };
            localStorage.removeItem("toDos");
            localStorage.setItem(
                "toDos",
                JSON.stringify([...data.slice(0, targetIndex), newTodo, ...data.slice(targetIndex + 1)])
            );
            return [...data.slice(0, targetIndex), newTodo, ...data.slice(targetIndex + 1)];
        });
    };
    return (
        <>
            <li>
                <span>{text}</span>
                {category !== Categories.Doing && (
                    <button name={Categories.Doing} onClick={onClickEvt}>
                        Doing
                    </button>
                )}
                {category !== Categories.To_Do && (
                    <button name={Categories.To_Do} onClick={onClickEvt}>
                        ToDo
                    </button>
                )}
                {category !== Categories.Done && (
                    <button name={Categories.Done} onClick={onClickEvt}>
                        Done
                    </button>
                )}
                <button name="Delete" onClick={onClickEvt}>
                    Delete
                </button>
            </li>
        </>
    );
};

// const ToDo = ({ id, text, category }: IForm) => {
//     const setToDos = useSetRecoilState(toDoState);
//     const onClickEvt = (event: React.MouseEvent<HTMLButtonElement>) => {
//         const {
//             currentTarget: { name },
//         } = event;
//         setToDos((data) => {
//             const targetIndex = data.findIndex((todo) => todo.id === id);
//             const newTodo = { text, id, category: name as any };
//             return [...data.slice(0, targetIndex), newTodo, ...data.slice(targetIndex + 1)];
//         });
//     };
//     return (
//         <>
//             <li>
//                 <span>{text}</span>
//                 {category !== "Doing" && (
//                     <button name="Doing" onClick={onClickEvt}>
//                         Doing
//                     </button>
//                 )}
//                 {category !== "To-Do" && (
//                     <button name="To-Do" onClick={onClickEvt}>
//                         ToDo
//                     </button>
//                 )}
//                 {category !== "Done" && (
//                     <button name="Done" onClick={onClickEvt}>
//                         Done
//                     </button>
//                 )}
//             </li>
//         </>
//     );
// };

export default ToDo;

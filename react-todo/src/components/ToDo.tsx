import { IForm, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
const ToDo = ({ id, text, category }: IForm) => {
    const setToDos = useSetRecoilState(toDoState);
    const onClickEvt = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((data) => {
            const targetIndex = data.findIndex((todo) => todo.id === id);
            const newTodo = { text, id, category: name as any };
            return [...data.slice(0, targetIndex), newTodo, ...data.slice(targetIndex + 1)];
        });
    };
    return (
        <>
            <li>
                <span>{text}</span>
                {category !== "Doing" && (
                    <button name="Doing" onClick={onClickEvt}>
                        Doing
                    </button>
                )}
                {category !== "To-Do" && (
                    <button name="To-Do" onClick={onClickEvt}>
                        ToDo
                    </button>
                )}
                {category !== "Done" && (
                    <button name="Done" onClick={onClickEvt}>
                        Done
                    </button>
                )}
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

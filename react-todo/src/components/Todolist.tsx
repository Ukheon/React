import { FormState, useForm, useFormState } from "react-hook-form";
import { useRecoilState, atom, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import React, { useEffect } from "react";
import { toDoState, toDoSelector, categoryState, Categories } from "../atoms";

const Header = styled.div`
    margin-top: 20px;
`;

const TodolList = () => {
    const toDos = useRecoilValue(toDoSelector);
    const setToDos = useSetRecoilState(toDoState);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    useEffect(() => {
        const localData = localStorage.getItem("toDos");
        const parseData = JSON.parse(localData as any);
        if (localData !== null) {
            setToDos(() => {
                return parseData;
            });
        }
    }, []);
    return (
        <>
            <Header>
                <button
                    onClick={() => {
                        localStorage.removeItem("toDos");
                        setToDos(() => []);
                    }}
                >
                    Clear ToDo List! ! !
                </button>
            </Header>
            <select value={category} onInput={onInput}>
                <option value={Categories.To_Do}>To_Do</option>
                <option value={Categories.Doing}>Doing</option>
                <option value={Categories.Done}>Done</option>
            </select>
            <CreateToDo />
            <ul>
                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
        </>
    );
};

export default TodolList;

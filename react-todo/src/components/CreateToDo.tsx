import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, IForm, IUseForm, categoryState } from "../atoms";
import styled from "styled-components";
import { useEffect, useState } from "react";

const InputSC = styled.input`
    width: 400px;
    box-sizing: border-box;
    margin-right: 10px;
`;

const CreateToDo = () => {
    const setToDo = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IUseForm>();
    const getToDo = useRecoilValue(toDoState);
    const [loading, setLoading] = useState(true);
    const onSubmit = (data: IUseForm) => {
        setToDo((prev) => {
            return [{ text: data.toDo, category, id: Date.now() }, ...prev];
        });
        setValue("toDo", "");
        setLoading(false);
    };
    useEffect(() => {
        if (loading === false) {
            localStorage.setItem("toDos", JSON.stringify(getToDo));
            setLoading(true);
        }
    });
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputSC {...register("toDo", { required: "input toDoList" })}></InputSC>
                <button>ADD</button>
            </form>
        </>
    );
};
export default CreateToDo;

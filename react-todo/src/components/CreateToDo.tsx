import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState, IForm, IUseForm } from "../atoms";
import styled from "styled-components";

const InputSC = styled.input`
    width: 400px;
    box-sizing: border-box;
    margin-right: 10px;
`;

const CreateToDo = () => {
    const setToDo = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IUseForm>();
    const onSubmit = (data: IUseForm) => {
        setToDo((prev) => {
            return [{ text: data.toDo, category: "To-Do", id: Date.now() }, ...prev];
        });
        setValue("toDo", "");
    };
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

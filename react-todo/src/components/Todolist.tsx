import { FormState, useForm, useFormState } from "react-hook-form";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoState } from "../atoms";

const Header = styled.div`
    margin-top: 20px;
`;

const TodolList = () => {
    const toDo = useRecoilValue(toDoState);
    return (
        <>
            <Header></Header>
            <CreateToDo />
            <ul>
                {toDo
                    ? toDo.map((data) => {
                          return <ToDo key={data.id} {...data} />;
                      })
                    : ""}
            </ul>
        </>
    );
};

export default TodolList;

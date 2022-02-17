import { IToDoState } from "./Atoms";

export const saveData = (toDo: IToDoState[]) => {
    localStorage.setItem("data", JSON.stringify(toDo));
};

export const getData = () => {
    return JSON.parse(localStorage.getItem("data") as any);
};

export const findIdx = (toDo: IToDoState[], name: string) => {
    let idx: number = 0;
    for (let i = 0; i < toDo.length; i++) {
        if (toDo[i].name === name) {
            idx = i;
            break;
        }
    }
    return idx;
};

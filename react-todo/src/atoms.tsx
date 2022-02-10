import { atom } from "recoil";

export const isDarkAtom = atom({
    key: "isDark",
    default: false,
});

export interface IUseForm {
    toDo: string;
}

export interface IForm {
    text: string;
    category: "To-Do" | "Done" | "Doing";
    id: number;
}

export const toDoState = atom<IForm[]>({
    key: "toDo",
    default: [],
});

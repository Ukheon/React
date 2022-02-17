import { atom, selector } from "recoil";

export interface IToDo {
    id: number;
    text: string;
}

export interface IToDoState {
    id: number;
    name: string;
    item: IToDo[];
}

export const toDoState = atom<IToDoState[]>({
    key: "toDo",
    default: [
        {
            id: 0,
            name: "TO DO",
            item: [],
        },
        {
            id: 1,
            name: "DOING",
            item: [],
        },
        {
            id: 2,
            name: "DONE",
            item: [],
        },
    ],
});

export const toDoChange = selector<IToDoState[]>({
    key: "toDoChange",
    get: ({ get }) => {
        return get(toDoState);
    },
    set: ({ set }, newValue) => {
        set(toDoState, newValue);
    },
});

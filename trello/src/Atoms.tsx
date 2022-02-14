import { atom, selector } from "recoil";

export const minutesState = atom({
    key: "minutes",
    default: 0,
});

export interface IToDo {
    text: string;
    id: number;
}

export interface IToDoState {
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "TO DO": [],
        DOING: [],
        DONE: [],
    },
});

export const toDoChange = selector<IToDoState>({
    key: "toDoChange",
    get: ({ get }) => {
        return get(toDoState);
    },
    set: ({ set }, newValue) => {
        console.log(newValue);
        set(toDoState, newValue);
    },
});

export const hourSelector = selector<number>({
    key: "hours",
    get: ({ get }) => {
        return Math.floor(get(minutesState) / 60);
    },
    set: ({ set }, newValue) => {
        const minute = Number(newValue) * 60;
        set(minutesState, minute);
    },
});

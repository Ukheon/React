import { atom, selector } from "recoil";

export const minutesState = atom({
    key: "minutes",
    default: 0,
});

export interface IToDo {
    id: number;
    text: string;
}

export interface IToDoState {
    id: number;
    name: string;
    item: IToDo[];
    // {
    //     id?: number;
    //     text?: string;
    // };
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
            item: [
                {
                    id: 1,
                    text: "1",
                },
                {
                    id: 2,
                    text: "2",
                },
                {
                    id: 3,
                    text: "3",
                },
                {
                    id: 4,
                    text: "4",
                },
            ],
        },
        {
            id: 2,
            name: "DONE",
            item: [
                {
                    id: 2,
                    text: "hi",
                },
            ],
        },
    ],
});

export const toDoChange = selector<IToDoState[]>({
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

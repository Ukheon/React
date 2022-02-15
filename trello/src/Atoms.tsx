import { atom, selector } from "recoil";

export interface IToDo {
    id: number;
    name: string;
    item: [
        {
            id: number;
            text: string;
        }
    ];
}

export interface IToDoState {
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "TO DO": [
            {
                id: 0,
                name: "TO DO",
                item: [
                    {
                        id: 1,
                        text: "h",
                    },
                ],
            },
        ],
        DONE: [],
        DOING: [],
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

import { atom, selector } from "recoil";

export enum Categories {
    "To_Do" = "To_Do",
    "Doing" = "Doing",
    "Done" = "Done",
}

export interface IUseForm {
    toDo: string;
}

export interface IForm {
    text: string;
    category: Categories;
    id: number;
}

export const isDarkAtom = atom({
    key: "isDark",
    default: false,
});

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.To_Do,
});

export const toDoState = atom<IForm[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((data) => data.category === category);
    },
});

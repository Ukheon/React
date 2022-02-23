import { atom } from "recoil";

export const HiddenState = atom<boolean>({
    key: "showing",
    default: false,
});

export const HiddenArrow = atom<boolean>({
    key: "arrow",
    default: false,
});

export const ShowSimilar = atom<boolean>({
    key: "similar",
    default: false,
});

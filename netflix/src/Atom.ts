import { atom } from "recoil";

export const HiddenState = atom<boolean>({
    key: "showing",
    default: false,
});

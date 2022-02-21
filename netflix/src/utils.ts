import { isNullishCoalesce } from "typescript";

const BASE_URL = "https://image.tmdb.org/t/p/";

export const makeImage = (image: string, flag?: string) => {
    if (image === null) return "null";
    return `${BASE_URL}${flag ? flag : "original"}/${image}`;
};

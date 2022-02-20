const BASE_URL = "https://image.tmdb.org/t/p/";

export const makeImage = (image: string, flag?: string) => {
    return `${BASE_URL}${flag ? flag : "original"}/${image}`;
};

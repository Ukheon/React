const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "47ecc5a93a7f0793d6d05fb39872e481";
const REGION_URL = "language=ko&page=1&region=kr";
const REGION_URL2 = "language=ko&page=2&region=kr";

// api.themoviedb.org/3/movie/505026/videos?api_key=47ecc5a93a7f0793d6d05fb39872e481&language=ko

export interface IMovie {
    backdrop_path: string;
    id: number;
    original_title: string;
    overview: string;
    title: string;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IMovieNow {
    dates?: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export const getMovies = async () => {
    return await fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&${REGION_URL}`).then((res) => res.json());
};

export const getMoviesTopRate = async () => {
    return await fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&${REGION_URL2}`).then((res) => res.json());
};

export const getMoviesPopular = async () => {
    return await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&${REGION_URL}`).then((res) => res.json());
};

export const getMoviesUpcoming = async () => {
    return await fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&${REGION_URL}`).then((res) => res.json());
};

export const getMoviesSimilar = async (id: string) => {
    return await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&${REGION_URL}`).then((res) => res.json());
};

export const getMoviesDetail = async (id: string) => {
    return await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=ko`).then((res) => res.json());
};

export const getSearchDetail = async (id: string, type: string) => {
    return await fetch(`${BASE_URL}${type}/${id}?api_key=${API_KEY}&language=ko`).then((res) => res.json());
};

export const getVideos = async (id: string, type: string) => {
    return await fetch(`${BASE_URL}${type}/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
};

export const getSearch = async (keyword: string) => {
    return await fetch(
        `${BASE_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
    ).then((res) => res.json());
};

export default {};

export interface Genre {
    id: number;
    name: string;
}

export interface IMovieDetail {
    title: string;
    genres: Genre[]; // 장르
    tagline: string; // 요약
    status: string; // 상영중
    release_date: string; // 상영날짜
    runtime: number; // 런타임
    vote_average: number; // 평점
}

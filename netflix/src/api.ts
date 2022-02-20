const API_KEY = "47ecc5a93a7f0793d6d05fb39872e481";
const BASE_URL = "https://api.themoviedb.org/3/";
const REGION_URL = "language=ko&page=1&region=kr";

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
    dates: {
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

export default {};

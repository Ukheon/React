import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getSearch } from "../api";
import Poster from "../Components/Search/Poster";
import { useEffect } from "react";

export interface Result {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    title: string;
    original_title: string;
    adult: string;
}

export interface ISearch {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

const Search = () => {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const id = new URLSearchParams(location.search).get("id");
    const { data, isLoading } = useQuery<ISearch>(["Search", `${keyword}`], () => getSearch(keyword!));
    useEffect(() => {}, [keyword]);
    if (isLoading) return <div></div>;
    return (
        <Main>
            <SearchResult>
                [<b>{keyword}</b>] 검색결과
            </SearchResult>
            <Wrapper>
                {data?.results.map((data, index) => {
                    if (data.media_type !== "tv" && data.media_type !== "movie") {
                        return;
                    }
                    if (data.poster_path === null) {
                        return;
                    }
                    return <Poster key={index} data={data} keyword={keyword} id={id} />;
                })}
                {data?.results.length === 0 ? <NoSearch>검색결과 없음</NoSearch> : null}
            </Wrapper>
        </Main>
    );
};

export default Search;

const Main = styled.div`
    margin-top: 15vh;
    width: 90vw;
    padding: 0 2vw;
`;

const SearchResult = styled.div`
    font-size: 3vw;
    align-items: center;
    > b {
        color: ${(props) => props.theme.green.lighter};
    }
`;

const Wrapper = styled.div`
    margin-top: 10vh;

    width: 90vw;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1vw;
`;

const NoSearch = styled.div`
    width: 100vw;
    font-size: 3vw;
`;

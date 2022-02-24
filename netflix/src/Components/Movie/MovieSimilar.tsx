import styled from "styled-components";
import { useQuery } from "react-query";
import { getMoviesSimilar } from "../../api";

import MoviesBox from "./MoviesBox";
import { useSetRecoilState } from "recoil";
import { ShowSimilar } from "../../Atom";
import { useState } from "react";
interface ISimilar {
    movieId: string;
    from: string;
}

const Similar = ({ movieId, from }: ISimilar) => {
    const { data, isLoading } = useQuery(["Movies", `Similar${movieId}`], () => getMoviesSimilar(movieId));
    const setShowSimilar = useSetRecoilState(ShowSimilar);
    if (isLoading) return <div></div>;
    const toggleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setShowSimilar(false);
    };
    return (
        <Main onClick={toggleClick}>
            <Row>
                <MoviesBox from={from} data={data}></MoviesBox>
            </Row>
        </Main>
    );
};

export default Similar;

const Main = styled.div`
    z-index: 100;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    height: 240vh;
`;

const Row = styled.div`
    position: fixed;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    background-color: ${(props) => props.theme.black.darker};
    bottom: 5vh;
    z-index: 100;
    gap: 3vw;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100vw;
    height: 24vh;
    color: white;
`;

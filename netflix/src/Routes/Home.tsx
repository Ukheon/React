import { useQuery } from "react-query";
import { getMovies, IMovieNow } from "../api";
import styled from "styled-components";
import { makeImage } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { rowVariants } from "../variants";
import { arrayBuffer } from "stream/consumers";
import HomeItem from "../Components/Home_Items";

const Home = () => {
    const { data, isLoading } = useQuery<IMovieNow>(["Movies", "nowPlaying"], getMovies);
    return (
        <Main>
            {isLoading ? (
                <Loader></Loader>
            ) : (
                <>
                    <Banner bgimage={makeImage(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <HomeItem data={data}></HomeItem>
                    {/* <HomeItem data={data}></HomeItem> */}
                </>
            )}
        </Main>
    );
};

export default Home;

const Main = styled.div`
    background-color: ${(props) => props.theme.black.veryDark};
    height: 200vh;
`;

const Loader = styled.div`
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgimage: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${(props) => props.bgimage});
    background-size: cover;
    height: 100vh;
    padding: 0 60px;
`;

const Title = styled.div`
    /* font-size: ${(props) => props.theme.fontSize.title}; */
    margin-bottom: 15px;
    font-size: 4vw;
`;

const Overview = styled.div`
    width: 50%;
    margin-left: 10px;
`;

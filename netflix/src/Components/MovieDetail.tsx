import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMoviesDetail, getVideos, IMovieNow } from "../api";
import { makeImage } from "../utils";
import { useQuery } from "react-query";

import ReactPlayer from "react-player";

const YoutubeUrl = "https://www.youtube.com/watch?v=";
interface IDetail {
    movieId: string;
    data?: IMovieNow;
}

interface IVideoResult {
    key: string;
}

interface IVideo {
    results: IVideoResult[];
}

const MovieDetail = ({ data, movieId }: IDetail) => {
    const Navigate = useNavigate();
    let urlArr: string[] = [];
    const { data: videoData, isLoading } = useQuery<IVideo>(["Movie", "what"], () => {
        return getVideos(movieId);
    });
    const { data: detail, isLoading: detailLoading } = useQuery<IDetail>(["Movie", "Detail"], () => {
        return getMoviesDetail(movieId);
    });
    console.log(detail);

    if (isLoading) return <div></div>;
    for (let i = 0; i < videoData!.results.length; i++) {
        urlArr.push(`${YoutubeUrl}${videoData?.results[i].key}`);
    }
    return (
        <Movies
            initial={{
                backgroundColor: "rgba(0,0,0,0)",
            }}
            animate={{
                backgroundColor: "rgba(0,0,0,0.3)",
            }}
            exit={{
                backgroundColor: "rgba(0,0,0,0)",
            }}
            onClick={() => Navigate("/")}
        >
            <ShowDetail
                initial={{ opacity: 1 }}
                animate={{
                    transition: {
                        type: "tween",
                        delay: 0.2,
                        duration: 0.3,
                    },
                }}
                layoutId={movieId + ""}
                exit={{ opacity: 0 }}
            >
                <ReactPlayer width="45vw" height="55vh" playing={true} muted={true} url={[...urlArr]}></ReactPlayer>
                <TextDetail>어떤걸 넣나요?</TextDetail>
            </ShowDetail>
        </Movies>
    );
};

export default MovieDetail;

const Movies = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;
    /* background-color: rgba(0, 0, 0, 0.2); */
    z-index: 10;
    top: 0;
`;

const ShowDetail = styled(motion.div)`
    position: fixed;
    top: 15vh;
    width: 45vw;
    height: 70vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 10;
`;

const TextDetail = styled(motion.div)`
    z-index: 10;
    height: 20vh;
    width: 100%;
    color: red;
    bottom: 0;
    background-color: ${(props) => props.theme.black.darker};
`;

const Tag = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 3.5vh;
    height: 7vh;
    background-color: black;
`;

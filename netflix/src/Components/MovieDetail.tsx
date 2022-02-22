import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMoviesDetail, getVideos, IMovieNow } from "../api";
import { useQuery } from "react-query";
import ReactPlayer from "react-player";
import { useSetRecoilState } from "recoil";
import { HiddenState } from "../Atom";

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

interface Genre {
    id: number;
    name: string;
}

interface IMovieDetail {
    title: string;
    genres: Genre[];
    tagline: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    overview: string;
}

const MovieDetail = ({ data, movieId }: IDetail) => {
    const { data: videoData, isLoading } = useQuery<IVideo>(["Movie", "what"], () => {
        return getVideos(movieId);
    });
    const { data: detail, isLoading: detailLoading } = useQuery<IMovieDetail>(["Movie", "Detail"], () => {
        return getMoviesDetail(movieId);
    });
    const setHidden = useSetRecoilState(HiddenState);

    const Navigate = useNavigate();
    const loading = isLoading || detailLoading;

    let urlArr: string[] = [];
    if (loading) return <div></div>;
    for (let i = 0; i < videoData!.results.length; i++) {
        urlArr.push(`${YoutubeUrl}${videoData?.results[i].key}`);
    }
    const stopProps = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    };

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
            onClick={() => {
                Navigate("/");
                setHidden(false);
            }}
        >
            <ShowDetail
                onClick={stopProps}
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
                <ReactPlayer autoplay width="60vw" height="60vh" playing={true} url={[...urlArr]}></ReactPlayer>
                <TextDetail>
                    <ExplainHard>
                        <div>
                            {detail?.title}
                            <p>
                                <h2>출시:&nbsp;</h2> {detail?.release_date}
                            </p>
                        </div>
                        <div>
                            <h1 style={{ marginBottom: "0.5vh" }}>{detail?.tagline}</h1>
                            {detail?.overview}
                        </div>
                    </ExplainHard>
                    <ExplainSoft>
                        <div>
                            <h1>평점:&nbsp;</h1> {detail?.vote_average} / 10
                        </div>
                        <div>
                            <h1>장르:</h1>
                            {detail?.genres.slice(0, 4).map((data, index) => (
                                <div>
                                    {data.name}
                                    {detail.genres.length - 1 === index ? "" : ","}
                                </div>
                            ))}
                        </div>
                        <div>
                            <h1>시간:&nbsp;</h1>
                            {detail?.runtime}분
                        </div>
                    </ExplainSoft>
                </TextDetail>
            </ShowDetail>
        </Movies>
    );
};

export default MovieDetail;

const Movies = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1;
    top: 0;
`;

const ShowDetail = styled(motion.div)`
    border-top-left-radius: 1vw;
    border-top-right-radius: 1vw;
    overflow: hidden;
    position: relative;
    top: 5vh;
    width: 60vw;
    height: 90vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 30;
`;

const TextDetail = styled(motion.div)`
    box-sizing: border-box;
    padding: 10px;
    z-index: 10;
    height: 30vh;
    width: 100%;
    bottom: 0;
    border-bottom-left-radius: 1vw;
    border-bottom-right-radius: 1vw;
    background-color: ${(props) => props.theme.black.darker};
    display: flex;
`;

const ExplainHard = styled.div`
    width: 65%;
    height: 30vh;
    color: ${(props) => props.theme.white.lighter};
    > div:first-child {
        height: 5vh;
        font-size: 1.5vw;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > p {
            display: flex;

            font-size: 1vw;
            color: ${(props) => props.theme.white.darker};
            font-weight: normal;
        }
        margin-bottom: 2vh;
    }
    > div:last-child {
        font-size: 1vw;
        height: 20vh;
        overflow: auto;

        text-overflow: ellipsis;
        color: ${(props) => props.theme.black.thin};
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    h1,
    h2 {
        color: ${(props) => props.theme.white.lighter};
        font-size: 1.1vw;
        font-weight: bold;
    }
    h2 {
        color: ${(props) => props.theme.green.lighter};
    }
`;

const ExplainSoft = styled.div`
    font-size: 1.2vw;
    width: 30%;
    margin-left: 5%;
    height: 20vh;
    text-align: right;
    > div {
        height: 5vh;
        font-size: 1vw;
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        > div {
            margin-left: 0.3vw;
        }
        > p {
            position: relative;
            top: -0.1vh;
        }
        &:last-child {
        }
    }

    h1 {
        color: ${(props) => props.theme.blue.lighter};
        font-size: 1.1vw;
        font-weight: bold;
    }
    h2 {
    }

    h5 {
        font-size: 0.8vw;
    }
`;

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMoviesDetail, getSearchDetail, getVideos, IMovieNow } from "../../api";
import { useQuery } from "react-query";
import ReactPlayer from "react-player";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HiddenArrow, HiddenState, ShowSimilar } from "../../Atom";
import Similar from "./MovieSimilar";

const YoutubeUrl = "https://www.youtube.com/watch?v=";
interface IDetail {
    movieId: string;
    data?: IMovieNow;
    unique: string;
    type: string;
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
    name: string;
    title: string;
    genres: Genre[];
    tagline: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    overview: string;
    first_air_date: string;
}

const MovieDetail = ({ movieId, unique, type }: IDetail) => {
    const { data: videoData, isLoading } = useQuery<IVideo>(["Movie", `video${movieId}ko`], () => {
        return getVideos(movieId, type);
    });
    const { data: detail, isLoading: detailLoading } = useQuery<IMovieDetail>(["Movie", `Detail${movieId}`], () => {
        return getSearchDetail(movieId, type);
    });
    const setHidden = useSetRecoilState(HiddenState);
    const Navigate = useNavigate();
    const setArrowHidden = useSetRecoilState(HiddenArrow);
    const [showSimilar, setShowSimilar] = useRecoilState(ShowSimilar);
    let urlArr: string[] = [];
    const loading = isLoading || detailLoading;

    if (loading) return null;
    let tempArr: string[] = [];
    for (let i = 0; i < videoData!.results.length; i++) {
        tempArr.push(`${YoutubeUrl}${videoData?.results[i].key}`);
    }
    urlArr = [...tempArr];

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
                Navigate(-1);
                setHidden(false);
                setArrowHidden(false);
                setShowSimilar(false);
            }}
        >
            <ShowDetail
                layoutId={movieId + unique}
                onClick={stopProps}
                initial={{ opacity: 1 }}
                animate={{
                    transition: {
                        type: "tween",
                        delay: 0.2,
                        duration: 0.3,
                    },
                }}
                exit={{ opacity: 0 }}
            >
                <ReactPlayer volume={0.3} width="60vw" height="60vh" playing muted={false} url={urlArr}></ReactPlayer>
                <TextDetail>
                    <ExplainHard>
                        <div>
                            {type === "movie" ? detail?.title : detail?.name}
                            {type === "movie" ? (
                                <p>
                                    <h2>출시:&nbsp;</h2> {detail?.release_date}
                                </p>
                            ) : (
                                <p>
                                    <h2>방영일: &nbsp;</h2> {detail?.first_air_date}
                                </p>
                            )}
                        </div>
                        {detail?.overview ? (
                            <div>
                                <h1 style={{ marginBottom: "0.5vh" }}>{detail?.tagline}</h1>
                                {detail?.overview}
                            </div>
                        ) : (
                            <div>줄거리가 없습니다</div>
                        )}
                    </ExplainHard>
                    <ExplainSoft>
                        {type === "movie" ? (
                            <>
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
                                <div>
                                    <h2 onClick={() => setShowSimilar(true)}>비슷한 컨텐츠</h2>
                                </div>
                            </>
                        ) : (
                            <div>TV Program.</div>
                        )}
                    </ExplainSoft>
                </TextDetail>
            </ShowDetail>
            {showSimilar ? <Similar movieId={movieId}></Similar> : ""}
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
            height: 8vh;
        }
    }

    h1 {
        color: ${(props) => props.theme.blue.lighter};
        font-size: 1.1vw;
        font-weight: bold;
    }
    h2 {
        text-decoration: underline;
        cursor: pointer;
        color: #b3b3ff;
        margin-top: 4vh;
        font-size: 1.2vw;
        &:hover {
            color: ${(props) => props.theme.white.darker};
        }
    }

    h5 {
        font-size: 0.8vw;
    }
`;

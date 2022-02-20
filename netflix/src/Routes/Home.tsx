import { useQuery } from "react-query";
import { getMovies, IMovieNow } from "../api";
import styled from "styled-components";
import { makeImage } from "../utils";
import { motion } from "framer-motion";
const Home = () => {
    const { data, isLoading } = useQuery<IMovieNow>(["Movies", "nowPlaying"], getMovies);
    console.log(data);
    return (
        <Main>
            {isLoading ? (
                <Loader></Loader>
            ) : (
                <>
                    <Banner bgImage={makeImage(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                            <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                        </svg> */}
                        <Row>
                            {data?.results.map((data, index) => {
                                if (index == 0) return;
                                if (index > 6) return;
                                return <Box bgImage={makeImage(data.backdrop_path || "", "w500")}>{data.title}</Box>;
                            })}
                        </Row>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                        </svg> */}
                    </Slider>
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgImage: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${(props) => props.bgImage});
    background-size: cover;
    /* width: 100%; */
    height: 100vh;
    padding: 0 60px;
`;

const Title = styled.div`
    font-size: ${(props) => props.theme.fontSize.title};
    margin-bottom: 15px;
`;

const Overview = styled.div`
    width: 50%;
    margin-left: 10px;
`;

const Slider = styled.div`
    padding: 60px;
    position: relative;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    position: absolute;
`;

const Box = styled(motion.div)<{ bgImage: string }>`
    display: flex;
    justify-content: center;
    line-height: 100px;
    font-size: ${(props) => props.theme.fontSize.item};
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${(props) => props.bgImage});
    background-size: cover;
    height: 150px;
`;

const LeftArrow = styled.svg``;

const RightArrow = styled.svg``;

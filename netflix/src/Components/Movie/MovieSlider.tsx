import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMovieNow } from "../../api";
import { rowVariants, boxVariants, itemTitleVariants } from "../../variants";
import { makeImage } from "../../utils";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import { HiddenArrow, HiddenState } from "../../Atom";
import { useRecoilState, useRecoilValue } from "recoil";
interface IData {
    data?: IMovieNow;
    tag: string;
    unique: string;
}

interface IParam {
    movieId: string | undefined;
    key: string | undefined;
}

const HomeItem = ({ data, tag, unique }: IData) => {
    const [clickHidden, setClickHidden] = useRecoilState(HiddenState);
    const [arrowHidden, setArrowHidden] = useRecoilState(HiddenArrow);
    const [slideIndex, setSlideIndex] = useState(0);
    const [clickSencor, setClickSencor] = useState(true);
    const [waitClick, setWaitClick] = useState(false);

    const navigate = useNavigate();
    const params = useParams<{ movieId: string | undefined; key: string | undefined }>();
    let Arr: number[] = [];
    for (let i = 0; i < Math.floor(data!.results.length / 6); i++) Arr.push(i);
    const increaseIndex = () => {
        if (waitClick) return;
        setWaitClick(true);

        if (slideIndex < Math.floor(data!.results.length / 6) - 1) {
            setSlideIndex((index) => index + 1);
        } else {
            setSlideIndex(0);
        }
        setClickSencor(true);
    };
    const decreaseIndex = () => {
        if (waitClick) return;
        setWaitClick(true);
        if (slideIndex !== 0) {
            setSlideIndex((index) => index - 1);
        } else {
            setSlideIndex((prev) => {
                if (data!.results.length - 1 / 6 - 1 >= 0) return Math.floor((data!.results.length - 1) / 6 - 1);
                else return 0;
            });
        }
        setClickSencor(false);
    };
    return (
        <Items>
            <Slider show={arrowHidden}>
                <LeftArrow
                    onClick={decreaseIndex}
                    xmlns="http://www.w3.org/2000/svg"
                    width={1000}
                    height={200}
                    viewBox="0 0 256 512"
                >
                    <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                </LeftArrow>
                <AnimatePresence initial={false} onExitComplete={() => setWaitClick(false)} custom={clickSencor}>
                    {unique === params.key && params.movieId ? (
                        <MovieDetail
                            data={data}
                            movieId={params.movieId}
                            from="movie"
                            unique={unique}
                            type={"movie"}
                        ></MovieDetail>
                    ) : null}
                    <Row
                        custom={clickSencor}
                        key={slideIndex}
                        variants={rowVariants}
                        initial="start"
                        animate="end"
                        exit="exit"
                        transition={{ duration: 1, type: "tween" }}
                    >
                        {data?.results.slice(slideIndex * 6, slideIndex * 6 + 6).map((data, index) => {
                            return (
                                <Box
                                    layoutId={data.id + unique}
                                    onClick={() => {
                                        setArrowHidden(true);
                                        setClickHidden(true);
                                        navigate(`/movies/${unique}/${data.id}`);
                                    }}
                                    key={index}
                                    variants={boxVariants}
                                    whileHover="hover"
                                    initial="normal"
                                    bgimage={makeImage(data.backdrop_path || "", "w500")}
                                >
                                    <ItemTitle variants={itemTitleVariants}>{data.title}</ItemTitle>
                                </Box>
                            );
                        })}
                    </Row>
                </AnimatePresence>
                <Tag>{tag}</Tag>
                <PageList page={Math.floor(data!.results.length / 6)}>
                    {Arr.map((key) => {
                        return <Page key={key} flag={key === slideIndex}></Page>;
                    })}
                </PageList>
                <RightArrow onClick={increaseIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                </RightArrow>
            </Slider>
        </Items>
    );
};

export default HomeItem;

const Items = styled.div`
    height: 20vh;
    min-height: 35vh;
`;

const Slider = styled.div<{ show: boolean }>`
    position: relative;
    top: -80px;
    > svg {
        width: 0.7vw;
        padding: 0 10px;
        height: 20vh;
        opacity: ${(props) => (props.show ? "0" : "1")};
        fill: ${(props) => props.theme.white.darker};
        background-color: rgba(255, 255, 255, 0.1);
        position: absolute;
        z-index: 10;
    }
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 1vw;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    left: 1vw;
    width: 97vw;
`;

const Box = styled(motion.div)<{ bgimage: string }>`
    font-size: ${(props) => props.theme.fontSize.item};
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${(props) => props.bgimage}),
        url("/images/notFound.jpg");
    background-size: cover;
    width: 15vw;
    height: 20vh;
    display: flex;
    justify-content: center;
    min-height: 24vh;
    &:nth-child(6n) {
        transform-origin: center left;
    }
    &:nth-child(7n) {
        transform-origin: center right;
    }
`;

const ItemTitle = styled(motion.h4)`
    position: absolute;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.black.darker};
    width: 15vw;
    font-size: ${(props) => props.theme.fontSize.default};
    bottom: 0;
    opacity: 0;
`;

const Tag = styled.span`
    position: absolute;
    top: -6vh;
    left: 2vw;
    font-size: ${(props) => props.theme.fontSize.itemTitle};
`;

const PageList = styled.ul<{ page: number }>`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(${(props) => props.page}, 1fr);
    right: 2vw;
    width: 10vw;
    gap: 0.5vw;
    top: -3.5vh;
`;

const Page = styled.li<{ flag: boolean }>`
    background-color: ${(props) => (!props.flag ? "rgba(118, 118, 118, 0.3)" : "white")};
    height: 0.8vh;
    border-radius: 1vw;
`;

const LeftArrow = styled.svg`
    left: 0;
    min-height: 24vh;
`;

const RightArrow = styled.svg`
    right: 0;
    min-height: 24vh;
`;

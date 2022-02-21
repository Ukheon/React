import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMovieNow } from "../api";
import { rowVariants, boxVariants } from "../variants";
import { makeImage } from "../utils";

interface IData {
    data?: IMovieNow;
}

const HomeItem = ({ data }: IData) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [clickSencor, setClickSencor] = useState(true);
    const [waitClick, setWaitClick] = useState(false);
    let Arr: number[] = [];
    for (let i = 0; i <= data!.total_pages - 1; i++) Arr.push(i);
    const increaseIndex = () => {
        if (waitClick) return;
        setWaitClick(true);
        if (slideIndex < data!.total_pages - 1) {
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
            <Slider>
                <LeftArrow onClick={decreaseIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                </LeftArrow>
                <AnimatePresence initial={false} onExitComplete={() => setWaitClick(false)} custom={clickSencor}>
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
                                    key={index}
                                    variants={boxVariants}
                                    whileHover="hover"
                                    initial="normal"
                                    bgimage={makeImage(data.backdrop_path || "", "w500")}
                                >
                                    <span>{data.title}</span>
                                </Box>
                            );
                        })}
                    </Row>
                </AnimatePresence>
                <Tag>현재 상영중</Tag>
                <PageList page={data!.total_pages + 1}>
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
const Slider = styled.div`
    position: relative;
    top: -80px;
    > svg {
        width: 2vw;
        padding: 0 10px;
        height: 20vh;
        fill: ${(props) => props.theme.white.darker};
        background-color: rgba(255, 255, 255, 0.1);
        position: absolute;
        z-index: 10;
    }
    div,
    svg {
        min-height: 24vh;
    }
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 1vw;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    left: 2vw;
    width: 96vw;
`;

const Box = styled(motion.div)<{ bgimage: string }>`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${(props) => props.theme.fontSize.item};
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${(props) => props.bgimage}),
        url("/images/notFound.jpg");
    background-size: cover;
    height: 20vh;

    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
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
    right: 3vw;
    width: 10vw;
    gap: 1vw;
    top: -3.5vh;
`;

const Page = styled.li<{ flag: boolean }>`
    background-color: ${(props) => (!props.flag ? "rgba(118, 118, 118, 0.3)" : "white")};
    height: 0.8vh;
    border-radius: 1vw;
`;

const LeftArrow = styled.svg`
    left: 0;
`;

const RightArrow = styled.svg`
    right: 0;
`;

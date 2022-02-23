import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMovieNow } from "../api";
import { rowVariants, boxVariants, itemTitleVariants } from "../variants";
import { makeImage } from "../utils";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import { HiddenArrow, HiddenState, ShowSimilar } from "../Atom";
import { useSetRecoilState } from "recoil";

interface IData {
    data: IMovieNow;
    tag?: string;
}

const MoviesBox = ({ data, tag }: IData) => {
    const setClickHidden = useSetRecoilState(HiddenState);
    const setArrowHidden = useSetRecoilState(HiddenArrow);
    const setSimilar = useSetRecoilState(ShowSimilar);
    const navigate = useNavigate();
    let Arr: number[] = [];
    for (let i = 0; i < Math.floor(data!.results.length / 6); i++) Arr.push(i);

    const similarEvent = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        event.stopPropagation();
        setArrowHidden(true);
        setClickHidden(true);
        setSimilar(false);
        navigate(`/movies/1key/${id}`);
    };

    return (
        <AnimatePresence initial={false}>
            <Row
                key="Row"
                variants={rowVariants}
                initial="start"
                animate="end"
                exit="exit"
                transition={{ duration: 1, type: "tween" }}
            >
                {data?.results.slice(0, 6).map((data, index) => {
                    return (
                        <Box
                            layoutId={data.id + ""}
                            onClick={(event) => {
                                similarEvent(event, data.id);
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
    );
};

export default MoviesBox;

const Row = styled(motion.div)`
    display: grid;
    gap: 1vw;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    left: 2vw;
    width: 96vw;
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
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
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
    opacity: 1;
`;

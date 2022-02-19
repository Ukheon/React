import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { animation, variants, circleVariants, presenceVariants, slideVariants, overlayVariants } from "./various";
import { setFlagsFromString } from "v8";

const arr = ["0", "1", "2", "3"];
const hello = [
    "border: 5px solid;\n\
    border-radius: 20px;\
    border-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);\
    border-image-slice: 1;",
    "display: grid;\
    grid-template-columns: repeat(3, 1fr);\
    grid-column: span 2;\n",
    " delay: 0.5,\
            delayChildren: 1,\
            staggerChildren: 0.2,\
        },",
    "Framer - Motion. Done! 낙서장 by ukheon",
];
function App() {
    const [layState, setLayState] = useState<null | string>(null);
    const [showing, setShowing] = useState(false);
    const [slideIdx, setSlideIdx] = useState(1);
    const [flag, setFlag] = useState(true);
    const [test, setTest] = useState(0);

    const LoadingFnc = (n: number) => {
        setTest(n);
    };
    const x = useMotionValue(0);
    const colorChange = useTransform(
        x,
        [-75, 0, 75],
        [
            "linear-gradient(135deg, #e09, #d0e)",
            "linear-gradient(135deg, #45fc6f, #22ff00)",
            "linear-gradient(135deg, #2cc0ff, #7edfff)",
        ]
    );

    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const dragScale = useTransform(x, [-75, 0, 75], [0.5, 0.75, 1]);
    const motionRef = useRef(null);
    const nextClick = () => {
        setFlag(true);
        setSlideIdx((idx) => idx + 1);
    };
    const prevClick = () => {
        setFlag(false);
        setSlideIdx((idx) => idx - 1);
    };
    return (
        <>
            <div style={{ marginTop: "30px" }}></div>
            <Tag>Framer Motion Example</Tag>
            <Main>
                <Wrapper>
                    <AnimatePresence>
                        {test !== 1 ? (
                            <BoxAnimation
                                key="animation"
                                variants={animation}
                                initial="start"
                                animate="end"
                            ></BoxAnimation>
                        ) : (
                            setTimeout(() => {
                                setTest(0);
                            }, 100)
                        )}
                        <Reload onClick={() => LoadingFnc(1)}>🔄</Reload>
                    </AnimatePresence>
                    <MainTag>#Default Animation</MainTag>
                </Wrapper>
                <Wrapper>
                    <AnimatePresence>
                        {test !== 2 ? (
                            <BoxVariants
                                key="delay, delayChild, stagglDelay"
                                variants={variants}
                                initial="start"
                                animate="end"
                            >
                                <Circle variants={circleVariants}></Circle>
                                <Circle variants={circleVariants}></Circle>
                                <Circle variants={circleVariants}></Circle>
                                <Circle variants={circleVariants}></Circle>
                            </BoxVariants>
                        ) : (
                            setTimeout(() => {
                                setTest(0);
                            }, 100)
                        )}
                        <Reload onClick={() => LoadingFnc(2)}>🔄</Reload>
                        <MainTag>#Variants & Delay</MainTag>
                    </AnimatePresence>
                </Wrapper>
                <Wrapper>
                    <AnimatePresence>
                        {test !== 3 ? (
                            <BoxGestures
                                whileHover={{ scale: 1.5, rotateZ: 90 }}
                                whileTap={{ scale: 1, borderRadius: "100px" }}
                            ></BoxGestures>
                        ) : (
                            setTimeout(() => {
                                setTest(0);
                            }, 100)
                        )}
                    </AnimatePresence>
                    <MainTag>#Gesture Hover&Click</MainTag>
                    <Reload onClick={() => LoadingFnc(3)}>🔄</Reload>
                </Wrapper>
                <Wrapper>
                    <AnimatePresence>
                        {test !== 4 ? (
                            <BiggerBoxDrag ref={motionRef}>
                                <BoxDrag
                                    drag={"x"}
                                    style={{ x: x, background: colorChange, scale: dragScale }}
                                    whileDrag={{ backgroundColor: "#79e7e4" }}
                                    dragElastic={0}
                                    dragConstraints={motionRef}
                                    dragSnapToOrigin
                                ></BoxDrag>
                            </BiggerBoxDrag>
                        ) : (
                            setTimeout(() => {
                                setTest(0);
                            }, 100)
                        )}
                    </AnimatePresence>
                    <Reload onClick={() => LoadingFnc(4)}>🔄</Reload>
                    <MainTag>#Drag</MainTag>
                </Wrapper>
                <Wrapper>
                    <AnimatePresence>
                        {test !== 5 ? (
                            <BiggerBoxDrag>
                                <BoxScroll
                                    style={{ scaleY: scale }}
                                    whileDrag={{ backgroundColor: "rgb(0,0,0)" }}
                                ></BoxScroll>
                            </BiggerBoxDrag>
                        ) : (
                            setTimeout(() => {
                                setTest(0);
                            }, 100)
                        )}
                    </AnimatePresence>
                    <Reload onClick={() => LoadingFnc(5)}>🔄</Reload>
                    <MainTag>#Scroll (viewportScroll)</MainTag>
                </Wrapper>
                <Wrapper>
                    <AnimatePresence>
                        {test !== 6 ? (
                            <Sgv xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <motion.path
                                    initial={{
                                        pathLength: 0,
                                        fill: "rgba(255, 255, 255, 0)",
                                    }}
                                    animate={{
                                        pathLength: 1,
                                        fill: "rgba(255,0,0,1)",
                                    }}
                                    transition={{
                                        default: { duration: 5 },
                                        fill: { duration: 1, delay: 3 },
                                    }}
                                    d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z"
                                />
                            </Sgv>
                        ) : (
                            setTimeout(() => {
                                setTest(0);
                            }, 100)
                        )}
                    </AnimatePresence>
                    <Reload onClick={() => LoadingFnc(6)}>🔄</Reload>
                    <MainTag>#Path</MainTag>
                </Wrapper>
            </Main>
            <Tag>Slide AnimatePresence</Tag>
            <Presence>
                <AnimatePresence custom={flag}>
                    <BiggerSlideBox>
                        <SlideBox
                            key={slideIdx}
                            custom={flag}
                            variants={slideVariants}
                            initial="start"
                            animate="end"
                            exit="exit"
                        >
                            <div>{slideIdx}</div>
                        </SlideBox>
                        <div>
                            <button onClick={prevClick}>prev</button>
                            <button onClick={nextClick}>next</button>
                        </div>
                    </BiggerSlideBox>
                </AnimatePresence>
            </Presence>
            <Tag>Grid LayoutID</Tag>
            <WrapperGrid>
                <Grid>
                    {arr.map((n, index) => (
                        <GridBox onClick={() => setLayState(n)} layoutId={n}>
                            {hello[index]}
                        </GridBox>
                    ))}
                </Grid>
                <AnimatePresence>
                    {layState ? (
                        <>
                            <OverLay
                                variants={overlayVariants}
                                initial="start"
                                animate="end"
                                exit="exit"
                                onClick={() => setLayState(null)}
                            >
                                <OverLayBox layoutId={layState}>{hello[Number(layState)]}</OverLayBox>
                            </OverLay>
                        </>
                    ) : null}
                </AnimatePresence>
            </WrapperGrid>
        </>
    );
}

export default App;

////////////////////////////////////////////////////////////////////////////////////

const Tag = styled.div`
    width: 1220px;
    margin: 0 auto;
    text-align: center;
    color: white;
    font-size: 24px;
    padding-bottom: 10px;
    border-bottom: 5px solid;
    border-image: linear-gradient(to right, #ffffffbd, #ffcdf3aa, #65d3ffaa);
    border-image-slice: 1;
    margin-bottom: 20px;
`;

const MainTag = styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    font-size: 24px;
    font-weight: bold;
`;

///////////////////////
// Example
///////////////////////
const Main = styled.div`
    width: 1300px;
    margin: 0 auto;
    gap: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
`;

const Wrapper = styled.div`
    width: 1300px;
    display: flex;
    height: ${(props) => props.theme.Dheight};
    width: ${(props) => props.theme.Dwidth};
    /* margin: 0 auto; */
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.bgGradation};
    position: relative;
`;

const BoxAnimation = styled(motion.div)`
    width: ${(props) => props.theme.D_boxWidth};
    height: ${(props) => props.theme.D_boxHeight};
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxVariants = styled(motion.div)`
    width: ${(props) => props.theme.D_boxWidth};
    height: ${(props) => props.theme.D_boxHeight};
    background-color: rgba(255, 255, 255, 0.2);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 20px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    place-self: center;
    background-color: white;
`;

const BoxGestures = styled(motion.div)`
    width: ${(props) => props.theme.D_boxWidth};
    height: ${(props) => props.theme.D_boxHeight};
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBoxDrag = styled(motion.div)`
    width: ${(props) => props.theme.D_boxWidth};
    height: ${(props) => props.theme.D_boxHeight};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxDrag = styled(motion.div)`
    width: 25px;
    height: 25px;
    scale: 0.3;
    background-color: white;
    border-radius: 12.5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxScroll = styled(motion.div)`
    width: ${(props) => props.theme.D_boxWidth};
    height: ${(props) => props.theme.D_boxHeight};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Sgv = styled.svg`
    width: ${(props) => props.theme.D_boxWidth};
    height: ${(props) => props.theme.D_boxHeight};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    path {
        stroke: black;
        stroke-width: 2;
    }
`;

const Reload = styled(motion.div)`
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 30px;
    height: 30px;
    font-size: 24px;
`;

/// Example Done.

const Presence = styled(motion.div)`
    width: 1500px;
    min-height: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;

const BiggerSlideBox = styled(motion.div)`
    width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    button {
        margin: 0 10px;
        font-size: 24px;
        padding: 5px 20px;
        color: white;
        background-color: transparent;
    }
    margin-bottom: 50px;
`;

const SlideBox = styled(motion.div)`
    width: 300px;
    height: 150px;
    border-radius: 30px;
    background-color: #c4f2ff;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    font-size: 30px;
`;

const WrapperGrid = styled.div`
    position: relative;
    width: 1220px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    background: ${(props) => props.theme.bgGradation};
    margin-bottom: 30px;
`;

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 800px;
    margin: 0 auto;
    gap: 10px;
    > div:first-child,
    > div:last-child {
        grid-column: span 2;
    }
    margin-bottom: 30px;
`;

const GridBox = styled(motion.div)`
    background-color: white;
    border-radius: 20px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px;
`;

const OverLay = styled(motion.div)`
    position: absolute;
    width: 300vw;
    height: 300vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const OverLayBox = styled(motion.div)`
    margin: 0 auto;
    width: 500px;
    height: 300px;
    border-radius: 30px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px;
`;

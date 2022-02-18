import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { animation, variants, circleVariants } from "./various";

function App() {
    const [loading, setLoading] = useState(true);
    const LoadingFnc = () => {
        console.log(loading);
        setLoading(!loading);
    };
    const biggerRef = useRef(null);
    return (
        <Main>
            <Wrapper>
                <BoxAnimation variants={animation} initial="start" animate="end"></BoxAnimation>
                <Reload onClick={LoadingFnc}>🔄</Reload>
            </Wrapper>
            <Wrapper>
                <BoxVariants variants={variants} initial="start" animate="end">
                    <Circle variants={circleVariants}></Circle>
                    <Circle variants={circleVariants}></Circle>
                    <Circle variants={circleVariants}></Circle>
                    <Circle variants={circleVariants}></Circle>
                </BoxVariants>
                <Reload onClick={LoadingFnc}>🔄</Reload>
            </Wrapper>
            <Wrapper>
                <BoxGestures
                    whileHover={{ scale: 1.5, rotateZ: 90 }}
                    whileTap={{ scale: 1, borderRadius: "100px" }}
                ></BoxGestures>
                <Reload onClick={LoadingFnc}>🔄</Reload>
            </Wrapper>
            <Wrapper>
                <BiggerBoxDrag ref={biggerRef}>
                    <BoxDrag
                        drag
                        whileDrag={{ backgroundColor: "#79e7e4" }}
                        dragConstraints={biggerRef}
                        dragElastic={0}
                        dragSnapToOrigin
                    ></BoxDrag>
                </BiggerBoxDrag>
                <Reload onClick={LoadingFnc}>🔄</Reload>
            </Wrapper>
            <Wrapper>
                <BiggerBoxDrag ref={biggerRef}>
                    <BoxDrag
                        drag
                        whileDrag={{ backgroundColor: "#79e7e4" }}
                        dragConstraints={biggerRef}
                        dragElastic={0}
                        dragSnapToOrigin
                    ></BoxDrag>
                </BiggerBoxDrag>
                <Reload onClick={LoadingFnc}>🔄</Reload>
            </Wrapper>
        </Main>
    );
}

export default App;

const Main = styled.div`
    width: 1500px;
    gap: 10px;
    display: flex;
    flex-wrap: wrap;
`;

const Wrapper = styled.div`
    display: flex;
    height: ${(props) => props.theme.Dheight};
    width: ${(props) => props.theme.Dwidth};
    /* margin: 0 auto; */
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #e09, #d0e);
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
    width: 50px;
    height: 50px;
    scale: 0.3;
    background-color: white;
    border-radius: 25px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Reload = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    font-size: 24px;
`;

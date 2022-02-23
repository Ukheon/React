import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { answerVariants } from "../variants";

const Home = () => {
    const [idx, setIdx] = useState(0);
    const toggleIdx = (event: React.MouseEvent<HTMLDivElement>, num: number) => {
        event.stopPropagation();
        setIdx(num);
    };
    return (
        <Main>
            <Header>
                <Text>
                    <h1>
                        영화와 시리즈를
                        <br></br>
                        무료로 볼 수 있는.
                    </h1>
                    <h2>컴퓨터 환경에서 시청하세요. 언제든 구경할 수 있습니다.</h2>
                    <Link to="/">
                        <h3>시작하기</h3>
                    </Link>
                </Text>
            </Header>
            <Contents>
                <SectionOne>
                    <div>
                        <h4>TV로 즐기세요.</h4>
                        <h5>
                            스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이 플레이어 등<br></br>
                            다양한 디바이스에서 시청하세요.
                        </h5>
                    </div>
                    <div>
                        <div>
                            <div>
                                <ReactPlayer
                                    style={{ zIndex: 10 }}
                                    width="100%"
                                    height="100%"
                                    playing
                                    muted
                                    url="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                                ></ReactPlayer>
                            </div>
                        </div>
                    </div>
                </SectionOne>
                <SectionTwo>
                    <AnimatePresence>
                        <Test layoutId="50" onClick={() => setIdx(10)}>
                            ㅎㅇ
                        </Test>
                        {idx === 10 ? (
                            <motion.div
                                layoutId="10"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ width: "300px", height: "300px" }}
                            >
                                안니용
                            </motion.div>
                        ) : null}
                        <Col onClick={() => setIdx(0)}>
                            <Question layoutId="10" onClick={(event) => toggleIdx(event, 1)}>
                                안녕하세요! ➕
                            </Question>
                            {idx === 1 ? (
                                <Answer
                                    variants={answerVariants}
                                    initial="start"
                                    animate={"end"}
                                    exit={{
                                        scale: 0,
                                        backgroundColor: "white",
                                        transition: {
                                            duration: 5,
                                        },
                                    }}
                                    // exit={{
                                    //     scale: 0,
                                    //     x: 100,
                                    //     transition: {
                                    //         duration: 5,
                                    //     },
                                    // }}
                                >
                                    kkkkkkkkkkkkkkkk
                                </Answer>
                            ) : null}

                            <Question onClick={(event) => toggleIdx(event, 2)}>
                                안녕하세요! ➕{idx === 2 ? <Answer>kkkkkkkkkkkkkkkk</Answer> : null}
                            </Question>
                            <Question onClick={(event) => toggleIdx(event, 3)}>
                                안녕하세요! ➕{idx === 3 ? <Answer>kkkkkkkkkkkkkkkk</Answer> : null}
                            </Question>
                            <Question onClick={(event) => toggleIdx(event, 4)}>
                                안녕하세요! ➕{idx === 4 ? <Answer>kkkkkkkkkkkkkkkk</Answer> : null}
                            </Question>
                            <Question onClick={(event) => toggleIdx(event, 5)}>
                                안녕하세요! ➕{idx === 5 ? <Answer>kkkkkkkkkkkkkkkk</Answer> : null}
                            </Question>
                            <Question onClick={(event) => toggleIdx(event, 6)}>
                                안녕하세요! ➕{idx === 6 ? <Answer>kkkkkkkkkkkkkkkk</Answer> : null}
                            </Question>
                        </Col>
                    </AnimatePresence>
                </SectionTwo>
            </Contents>
        </Main>
    );
};

const Main = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 270vh;
    h1 {
        color: white;
        font-size: 5vw;
        font-weight: bold;
    }
    h2 {
        margin-top: 4vh;
        font-size: 3vw;
    }
    h3 {
        color: white;
        padding: 10px;
        margin: 0 auto;
        width: 20vw;
        border-radius: 15px;
        margin-top: 3vh;
        font-size: 5vw;
        background-color: red;
    }
    h4 {
        color: white;
        font-size: 4vw;
        font-weight: bold;
    }
    h5 {
        margin-top: 4vh;
        font-size: 2vw;
    }
`;

export default Home;

const Header = styled.div`
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        url("https://assets.nflxext.com/ffe/siteui/vlv3/ed0b5df9-ba9d-4534-bd09-57993daeda56/ad1fd8bb-8268-44ae-bfca-3da8cfc5726f/KR-ko-20220214-popsignuptwoweeks-perspective_alpha_website_large.jpg");
    background-size: cover;
    width: 100%;
    height: 100vh;
    border-bottom: 1vw solid ${(props) => props.theme.black.darker};
`;

const Text = styled.div`
    position: relative;
    top: 30vh;
    text-align: center;
    justify-content: center;
    color: ${(props) => props.theme.white.darker};
`;

const Contents = styled.div`
    height: 170vh;
    width: 100%;
    background-color: black;
`;

const SectionOne = styled.div`
    position: relative;
    box-sizing: border-box;
    padding-top: 15vh;
    display: flex;
    width: 100%;
    height: 70vh;
    border-bottom: 1vw solid ${(props) => props.theme.black.darker};
    > div:first-child {
        width: 40%;
        padding-left: 13vw;
        padding-top: 2vw;

        /* text-align: center; */
    }
    > div:last-child {
        position: relative;
        width: 40%;
        height: 70vh;
        /* background-color: red; */
        > div {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: -15vh;
            width: 100%;
            height: 90%;
            background-image: url("https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png");
            background-size: cover;
            background-position: center;
            z-index: 10;
            > div {
                overflow: hidden;
                position: relative;
                top: -1vh;
                width: 75%;
                height: 60%;
                /* border: 1px solid red; */
                /* z-index: 5; */
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
`;

const SectionTwo = styled.div`
    width: 100%;
    height: 70vh;
    border-bottom: 1vw solid ${(props) => props.theme.black.darker};
`;

const Col = styled(motion.div)`
    margin-top: 10vh;
    width: 100%;
    font-size: 2vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background: linear-gradient(135deg, #ff0000, #2600ff);
`;

const Question = styled(motion.div)`
    text-align: center;
    line-height: 10vh;
    background-color: ${(props) => props.theme.black.darker};
    width: 50%;
    height: 10vh;
`;

const Answer = styled(motion.div)`
    box-sizing: border-box;
    width: 50%;
    height: 30vh;
    text-align: center;
    display: flex;
    z-index: 10;
    border: 1px solid blue;
`;

const Test = styled(motion.div)`
    background-color: white;
    width: 100%;
    height: 30vh;
`;

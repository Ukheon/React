import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";

const ItemList = [
    {
        title: "학습 2022.02.07 ~ 2022.02.25",
        text: "ReactQuery, ReactRouterDom-V6\n React-Player, *Recoil*, useForm\n Framer-Motion & React-beautiful-dnd: Awesome!\n CSS vw, vh, linear-gradation styled-component Theme: 너무좋았다.\n ApexChart&React-Helmet: coming soon?\n Typescript: 힘들다.",
    },
    {
        title: "NormadCoder",
        text: "클론코딩에서 많은것을 배웠습니다.\n실제로 사용할 수 있는 여러 방법을 배우게됩니다.",
    },
];

const Home = () => {
    return (
        <Main>
            <Header>
                <Text>
                    <h1>
                        영화의 정보를
                        <br></br>
                        무료로 볼 수 있는.
                    </h1>
                    <h2>컴퓨터 환경에서 시청하세요. 언제든 구경할 수 있습니다.</h2>
                    <Link to="/movies">
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
                    <AnimateSharedLayout>
                        <Col layout>
                            {ItemList.map((data) => {
                                return <ListItem title={data.title} text={data.text}></ListItem>;
                            })}
                        </Col>
                    </AnimateSharedLayout>
                </SectionTwo>
            </Contents>
        </Main>
    );
};

interface IList {
    title: string;
    text: string;
}

const ListItem = ({ title, text }: IList) => {
    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    };
    const textArr = text.split("\n");
    return (
        <Question layout onClick={toggle} initial={{ borderRadius: 10 }}>
            <QuestionTitle layout>
                <div>{title}</div>
                <div>➕</div>
            </QuestionTitle>
            <AnimatePresence>
                {show && (
                    <Answer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout>
                        <span>
                            {textArr.map((data) => {
                                return (
                                    <p>
                                        {data}
                                        <br></br>
                                    </p>
                                );
                            })}
                            {}
                        </span>
                    </Answer>
                )}
            </AnimatePresence>
        </Question>
    );
};

const Main = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 200vh;
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
    height: 180vh;
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
    height: 10vh;
`;

const Col = styled(motion.ul)`
    margin-top: 10vh;
    width: 100%;
    font-size: 2vw;
    display: flex;
    flex-direction: column;
    color: white;
`;

const Question = styled(motion.li)`
    width: 50%;
    margin: 0 auto;
    background-color: ${(props) => props.theme.black.lighter};
    margin-bottom: 1vh;
`;

const QuestionTitle = styled(motion.div)`
    height: 10vh;
    display: flex;
    padding: 0 2vw;
    justify-content: space-between;
    align-items: center;
`;

const Answer = styled(motion.div)`
    width: 100%;
    box-sizing: border-box;
    color: ${(props) => props.theme.white.darker};
    border-top: 3px solid black;
    margin-top: 2vh;
    padding: 30px;
`;

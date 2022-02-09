/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { FetchCoins } from "../Api";
import { useQuery } from "react-query";
import Coin from "./Coin";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
const MainC = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const CoinC = styled.li`
    background-color: white;
    /* color: ${(props) => props.theme.bgColor}; */
    color: black;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Btn = styled.button`
    margin-left: 10px;
    font-size: 20px;
    cursor: pointer;
    background-color: inherit;
    border: none;
`;

function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", FetchCoins);
    const themeChanger = useSetRecoilState(isDarkAtom);

    return (
        <MainC>
            <Container>
                <Helmet>
                    <title>Coin</title>
                </Helmet>
                <Header>
                    <Title>
                        코인
                        <Btn
                            onClick={() => {
                                themeChanger((prev) => !prev);
                            }}
                        >
                            🌓
                        </Btn>
                    </Title>
                </Header>
                {isLoading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <CoinsList>
                        {data?.map((coin) => (
                            <CoinC key={coin.id}>
                                <Link
                                    to={{
                                        pathname: `/${coin.id}`,
                                        state: { name: coin.name },
                                    }}
                                >
                                    <Img
                                        src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                    />
                                    {coin.name} &rarr;
                                </Link>
                            </CoinC>
                        ))}
                    </CoinsList>
                )}
            </Container>
            <Switch>
                <Route path={`/:coinId`}>
                    <Coin></Coin>
                </Route>
            </Switch>
        </MainC>
    );
}
export default Coins;
export { Loader, Header, Title, Container };

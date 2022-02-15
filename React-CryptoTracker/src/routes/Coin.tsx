import { useLocation, useParams, Route, Switch, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Container, Header, Title, Loader } from "./Coins";
import { useQuery } from "react-query";
import { FetchCoinInfo, FetchCoinPrice } from "../Api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
interface stateInterface {
    name: string;
}

interface IInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPrice {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 5px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
    a {
        display: block;
    }
`;

function Coin() {
    const { coinId } = useParams<{ coinId: string }>();
    const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(["info", coinId], () => FetchCoinInfo(coinId));
    const { isLoading: priceLoading, data: priceData } = useQuery<IPrice>(["tricker", coinId], () =>
        FetchCoinPrice(coinId)
    );
    const chartMatch = useRouteMatch("/:coinId/chart");
    const priceMatch = useRouteMatch("/:coinId/price");
    const { state } = useLocation<stateInterface>();
    const loading = infoLoading || priceLoading;
    return (
        <Container>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price Now</span>
                            <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link
                                to={{
                                    pathname: `/${coinId}/chart`,
                                    state: {
                                        price: priceData?.quotes.USD,
                                    },
                                }}
                            >
                                Chart
                            </Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link
                                to={{
                                    pathname: `/${coinId}/price`,
                                    state: {
                                        coinId: coinId,
                                    },
                                }}
                            >
                                Price
                            </Link>
                        </Tab>
                    </Tabs>
                    <Switch>
                        <Route path={`/${coinId}/chart`}>
                            <Chart coinId={coinId}></Chart>
                        </Route>
                        <Route path={`/${coinId}/price`}>
                            <Price coinId={coinId} priceData={priceData?.quotes.USD}></Price>
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
}
export default Coin;
export { Overview, OverviewItem };

import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { FetchCoins } from "../api";
import { useQuery } from "react-query";
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

const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.bgColor};
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

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", FetchCoins);
	//const [coins, setCoins] = useState<CoinInterface[]>([]);
	//const [loading, setLoading] = useState(true);
	//useEffect(() => {
	//	(async () => {
	//		const response = await fetch("https://api.coinpaprika.com/v1/coins");
	//		const json = await response.json();
	//		setCoins(json.slice(0, 100));
	//		setLoading(!loading);
	//	})();
	//}, []);
	//FetchCoins();
	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name },
								}}
							>
								<Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}
export default Coins;
export { Loader, Header, Title, Container };

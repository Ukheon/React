
import { Overview, OverviewItem } from "./Coin";
import styled from "styled-components";
interface IPrice {
	coinId: string;
	priceData?: {
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
}

interface IRepeat {
	time: string;
	percent?: any;
}

const Accent = styled.span<{ flag?: boolean }>`
	color: ${(props) => (props.flag ? props.theme.accentColor : "white")};
`;

const Percent = styled.span<{ flag: boolean }>`
	color: ${(props) => (props.flag ? "red" : "blue")};
`;

const RepeatOverview = ({ time, percent }: IRepeat) => {
	const flag: boolean = percent >= 0 ? true : false;

	return (
		<Overview>
			<OverviewItem>
				{/* <span>Time</span> */}
				<span>{time}</span>
			</OverviewItem>
			<OverviewItem>
				{/*<span>Percent</span>*/}
				<Percent flag={flag}>{percent}%</Percent>
			</OverviewItem>
		</Overview>
	);
};

function Price({ coinId, priceData }: IPrice) {
	return (
		<>
			<Overview>
				<OverviewItem>
					<span>Name</span>
					<span>{coinId}</span>
				</OverviewItem>
				<OverviewItem>
					<span>hightest date</span>
					<span>{priceData?.ath_date.slice(0, 10)}</span>
				</OverviewItem>
				<OverviewItem>
					<span>highest price</span>
					<span>{priceData?.ath_price.toFixed(3)}</span>
				</OverviewItem>
			</Overview>
			<hr></hr>
			<Overview>
				<OverviewItem>
					<Accent flag={true}>Date</Accent>
				</OverviewItem>
				<OverviewItem>
					<Accent flag={true}>Percent</Accent>
				</OverviewItem>
			</Overview>
			<RepeatOverview time={"from Ath"} percent={priceData?.percent_from_price_ath} />
			<RepeatOverview time={"30d ago"} percent={priceData?.percent_change_30d} />
			<RepeatOverview time={"7d ago"} percent={priceData?.percent_change_7d} />
			<RepeatOverview time={"12h ago"} percent={priceData?.percent_change_12h} />
			<RepeatOverview time={"6h ago"} percent={priceData?.percent_change_6h} />
			<RepeatOverview time={"1h ago"} percent={priceData?.percent_change_1h} />
		</>
	);
}

export default Price;

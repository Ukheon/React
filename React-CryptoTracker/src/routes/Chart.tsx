import { useQuery } from "react-query";
import { FetchCoinHistorycal } from "../Api";
import ApexChart from "react-apexcharts";
interface IChart {
	coinId: string;
}
interface IHistory {
	close: number;
	high: number;
	low: number;
	market_cap: number;
	open: number;
	volume: number;
	time_close: string;
	time_open: string;
}

function Chart({ coinId }: IChart) {
	const { isLoading, data } = useQuery<IHistory[]>(["historyCal", coinId], () => FetchCoinHistorycal(coinId));
	return (
		<div>
			{isLoading ? (
				"Loading . . ."
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: "Price",
							data: data?.map((price) => price.close),
						},
					]}
					options={{
						theme: {
							mode: "dark",
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: { show: false },
						stroke: {
							curve: "smooth",
							width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
						},
					}}
				/>
			)}
		</div>
	);
}
export default Chart;

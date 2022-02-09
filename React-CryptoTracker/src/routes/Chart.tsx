import { useQuery } from "react-query";
import { FetchCoinHistorycal } from "../Api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
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
    const themeChcker = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistory[]>(["historyCal", coinId], () => FetchCoinHistorycal(coinId));
    let candleData;
    let lineData;
    if (data !== undefined) {
        console.log(data, "sibal");
        candleData = data!.map((price) => [
            Date.parse(price.time_open),
            price.high.toFixed(3),
            price.open.toFixed(3),
            price.low.toFixed(3),
            price.close.toFixed(3),
        ]);
        lineData = data!.map((price) => [Date.parse(price.time_open), price.high.toFixed(3)]);
    }
    return (
        <div>
            {isLoading && data === undefined ? (
                "Loading . . ."
            ) : (
                <ApexChart
                    series={[
                        {
                            name: "candle",
                            type: "candlestick",
                            data: candleData,
                        },
                        {
                            name: "line",
                            type: "line",
                            data: lineData,
                        },
                    ]}
                    options={{
                        theme: {
                            mode: themeChcker ? "light" : "dark",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        chart: {
                            type: "candlestick",
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: true },
                        stroke: {
                            curve: "smooth",
                            width: 2,
                        },
                        yaxis: {
                            show: true,
                        },
                        xaxis: {
                            axisBorder: { show: true },
                            axisTicks: { show: false },
                            type: "datetime",
                            labels: { show: true },
                        },
                    }}
                />
            )}
        </div>
    );
}
export default Chart;

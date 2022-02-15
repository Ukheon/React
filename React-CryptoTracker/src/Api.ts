const BaseUrl = "https://api.coinpaprika.com/v1";

export async function FetchCoins() {
    return (await (await fetch(`${BaseUrl}/coins`)).json()).slice(0, 100);
}

export async function FetchCoinInfo(coinId: string) {
    return await (await fetch(`${BaseUrl}/coins/${coinId}`)).json();
}

export async function FetchCoinPrice(coinId: string) {
    return await (await fetch(`${BaseUrl}/tickers/${coinId}`)).json();
}
export async function FetchCoinHistorycal(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7 * 2;
    return await (await fetch(`${BaseUrl}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
}

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

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/coins";
import Coin from "./routes/coin";
function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/:coinId">
					<Coin/>
				</Route>
				<Route path="/">
					<Coins />
				</Route>
			</Switch>
		</BrowserRouter>

	);

}
export default Router;

import { useParams } from "react-router-dom";
function Price() {
	const test = useParams();
	console.log(test, "price");
	return <div>price</div>;
}

export default Price;

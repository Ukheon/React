import { useParams } from "react-router-dom";
function Chart() {
	const test = useParams();
	console.log(test, "chart");
	return <div>chart</div>;
}

export default Chart;

import React, { useState } from "react";

function Form() {
	const [value, setValue] = useState("");

	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const msg = event.currentTarget.value;
		setValue(msg);
	}

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("hello " + value);
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input value={value} type="text" onChange={onChange}>

				</input>
				<button>Log In</button>
			</form>
		</div>

	);
}
export default Form;

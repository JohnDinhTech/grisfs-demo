import React, { useState } from "react";
import { Button } from "reactstrap";
import Form from "./layout/Form/Form.component";
import axios from "axios";

const App = () => {
	const [imgSrc, updateSrc] = useState();

	const handleChange = async () => {
		const res = await axios.get("/random/image");
		updateSrc(res.data);
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "5rem",
			}}
		>
			<h1>Mongo File Uploads</h1>
			<Form />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Button
					color='success'
					style={{
						marginTop: "5rem",
						padding: "2rem 1.5rem",
					}}
					onClick={handleChange}
				>
					Get Random Picture
				</Button>
				{imgSrc && (
					<img
						style={{
							maxWidth: "800px",
							maxHeight: "600px",
						}}
						src={`/image/${imgSrc}`}
					/>
				)}
			</div>
		</div>
	);
};

export default App;

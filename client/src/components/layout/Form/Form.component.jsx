import React from "react";
import { FormGroup, CustomFileInput, Button } from "reactstrap";
const Form = () => {
	return (
		<form
			action='/upload'
			method='POST'
			encType='multipart/form-data'
			style={{
				maxWidth: "30%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<FormGroup>
				<CustomFileInput id='file' type='file' name='file' />
			</FormGroup>
			<Button color='primary'>Submit</Button>
		</form>
	);
};

export default Form;

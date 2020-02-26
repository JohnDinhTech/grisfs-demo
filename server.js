const PORT = 5000;
const express = require("express");
const connectDB = require("./db");

const app = express();

const runServer = async () => {
	try {
		const { gfs, upload } = await connectDB();

		app.get("/", (req, res) => {
			res.send("Hello World");
		});

		app.get("/image/:filename", async (req, res) => {
			const { filename } = req.params;
			try {
				const file = await gfs.find({ filename }).toArray();

				if (file.length === 0 || !file) {
					res.status(404).json({ err: "This file does not exist" });
				} else {
					gfs.openDownloadStreamByName(filename).pipe(res);
				}
			} catch (error) {
				res.status(404).json({ err: "This file does not exist" });
				console.error(error.message);
			}
		});

		app.get("/random/image", async (req, res) => {
			try {
				const images = await gfs.find().toArray();
				if (images.length === 0 || !images) {
					res.status(404).json({ err: "This file does not exist" });
				} else {
					const randomIndex = Math.floor(
						Math.random() * images.length
					);
					const filename = images[randomIndex].filename;
					gfs.openDownloadStreamByName(filename).pipe(res);
					res.json(filename);
				}
			} catch (err) {
				console.error(err.message);
			}
		});

		app.post("/upload", upload.single("file"), (req, res) => {
			res.redirect("/");
		});

		app.listen(PORT, () => {
			console.log(`Server has started on ${PORT}`);
		});
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

runServer();

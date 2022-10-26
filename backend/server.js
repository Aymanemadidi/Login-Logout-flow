import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "./model.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello from server");
});

app.post("/api/register", async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res
				.status(200)
				.json({ message: "User already in DB", state: "already" });
		}
		await User.create({
			email,
		});
		const token = jwt.sign({ email }, "secret123");
		res.json({ state: "new", token });
	} catch (e) {
		// console.log(e);
		res.status(400).json({ state: "error", error: "unexpected error" });
	}
});

app.listen(port, () => {
	console.log(`server listening on ${port}`);
});

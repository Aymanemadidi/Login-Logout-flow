import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "./user.model.js";
import VerificationCode from "./verificationCode.model.js";
import nodemailer from "nodemailer";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(
	"mongodb+srv://aymanelmadidi:Fonctionzeta1$@cluster0.twe8qdn.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // use SSL
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

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
		// const token = jwt.sign({ email }, "secret123");
		// res.json({ state: "new", token });
		res.json({ state: "new" });
	} catch (e) {
		// console.log(e);
		res.status(400).json({ state: "error", error: "unexpected error" });
	}
});

app.post("/api/confirm", async (req, res) => {
	try {
		await db.collections.verificationcodes.deleteMany({
			owner: req.body.email,
		});
		const code = Math.floor(100000 + Math.random() * 900000);
		await VerificationCode.create({ code, owner: req.body.email });
		let info = await transporter.sendMail({
			from: '"Ayamne Elmadidi 👻" <aymanelmadidi@gmail.com>', // sender address
			to: `${req.body.email}`, // list of receivers
			subject: "Your confirmation code", // Subject line
			text: "", // plain text body
			html: `<h3>${code}</h3>`, // html body
		});
		console.log(info);

		res.json({ message: "email sent" });
	} catch (error) {
		console.error(error);
		res.json({ error });
	}
});

app.post("/api/checkConfirm", async (req, res) => {
	try {
		const codeInDB = await VerificationCode.findOne({ owner: req.body.owner });
		console.log("checkConfirm entered");
		console.log("in DB:", typeof codeInDB.code);
		console.log("in body:", typeof req.body.code);

		// console.log(Number(codeInDB.code) === Number(req.body.code));

		if (!codeInDB.code) {
			return res.json({ error: "owner does not have a code" });
		}
		if (codeInDB.code === Number(req.body.code)) {
			res.json({ state: "success" });
		}
	} catch (error) {
		res.json({ error });
	}
});

app.listen(port, () => {
	console.log(`server listening on ${port}`);
});

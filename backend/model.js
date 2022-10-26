import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String },
});

const model = mongoose.model("User", userSchema);

export default model;

import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema({
	owner: { type: String, required: true },
	code: { type: Number, required: true, unique: true },
});

const model = mongoose.model("VerificationCode", verificationCodeSchema);

export default model;

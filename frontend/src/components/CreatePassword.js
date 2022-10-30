import React, { useState, useEffect, useRef } from "react";
import { checkNumber, checkSymbol, checkUpper } from "../utils";

function CreatePassword() {
	const [isUpper, setIsUpper] = useState(false);
	const [isNum, setIsNum] = useState(false);
	const [isSymbol, setIsSymbol] = useState(false);
	const [lengthOk, setLengthOk] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordShow, setPasswordShow] = useState(false);
	const [passwordOK, setPasswordOK] = useState(false);
	const [startCheck, setStartCheck] = useState(false);

	const [passwordState, setPasswordState] = useState("idle");

	const [im, setI] = useState(0);

	function handlePasswordChange(event) {
		if (isUpper && !checkUpper(event.target.value)) {
			setIsUpper(false);
			setI(im - 1);
		}
		if (isSymbol && !checkSymbol(event.target.value)) {
			setIsSymbol(false);
			setI(im - 1);
		}
		if (isNum && !checkNumber(event.target.value)) {
			setIsNum(false);
			setI(im - 1);
		}
		if (lengthOk && event.target.value.length < 7) {
			setLengthOk(false);
			setI(im - 1);
		}
		/**
		 *
		 */
		if (!isUpper && checkUpper(event.target.value)) {
			setIsUpper(true);
			setI(im + 1);
		}
		if (!isSymbol && checkSymbol(event.target.value)) {
			setIsSymbol(true);
			setI(im + 1);
		}
		if (!isNum && checkNumber(event.target.value)) {
			setIsNum(true);
			setI(im + 1);
		}
		if (!lengthOk && event.target.value.length > 6) {
			setLengthOk(true);
			setI(im + 1);
		}
		// console.log(im);
	}

	useEffect(() => {
		if (im === 0) {
			setPasswordState("idle");
		} else if (im === 1) {
			setPasswordState("weak");
		} else if (im === 2 && lengthOk) {
			console.log("boom");
			setPasswordState("medium");
		} else if (im === 3 && lengthOk) {
			console.log("boom");
			setPasswordState("good");
		} else if (im === 4 && lengthOk) {
			console.log("boom");
			setPasswordState("strong");
		}
	}, [im, lengthOk]);

	return (
		<div className="flex justify-center">
			<div className="flex justify-center">
				<div className="signup-wrapper p-5 mt-20 flex flex-col gap-2">
					<div>
						<p className="font-poppins w-[348px] md:w-[390px] text-[28px]">
							Definissez votre nouveau mot de passe
						</p>
					</div>
					<div className="font-light w-[367px] md:w-[473px]">
						<p className="text-[#636E72] text-[14px]">
							Vous en aurez besoin pour vous connecter et accéder à votre
							application .
						</p>
					</div>
					<div className="mt-5">
						<p className="text-black font-Poppins text-[13px]">Mot de passe</p>
					</div>
					<div>
						<input
							type={passwordShow ? "text" : "password"}
							className="bg-[#F7F7F7] text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] md:w-[500px] pl-3 font-normal mt-1 text-[15px] active:border-green-500"
							placeholder="Nouveau mot de passe"
							onChange={(e) => {
								setStartCheck(true);
								setPassword(e.target.value);
								handlePasswordChange(e);
							}}
							value={password}
						/>
					</div>
					<div className="flex gap-4 justify-between w-[360px] md:w-[500px]">
						<div
							className={`border w-1/4 h-1
              ${passwordState === "weak" ? "bg-red-500" : ""}${
								passwordState === "medium" ? "bg-black" : ""
							}${passwordState === "good" ? "bg-orange-500" : ""}${
								passwordState === "strong" ? "bg-[#62C247]" : ""
							}`}
						></div>
						<div
							className={`border w-1/4 h-1
              ${passwordState === "medium" ? "bg-black" : ""}${
								passwordState === "good" ? "bg-orange-500" : ""
							}${passwordState === "strong" ? "bg-[#62C247]" : ""}`}
						></div>
						<div
							className={`border w-1/4 h-1
              ${passwordState === "good" ? "bg-orange-500" : ""}${
								passwordState === "strong" ? "bg-[#62C247]" : ""
							}`}
						></div>
						<div
							className={`border w-1/4 h-1 ${
								passwordState === "strong" ? "bg-[#62C247]" : ""
							}`}
						></div>
					</div>
					<div className="flex justify-between">
						<div className="text-Poppins font-thin text-[12px] cursor-pointer">
							<p onClick={() => setPasswordShow(!passwordShow)}>
								{passwordShow ? "cacher" : "montrer"}
							</p>
						</div>
						<div className="text-Poppins font-thin text-[12px]">
							{passwordState === "idle" ||
							passwordState === "weak" ||
							passwordState === "medium" ? (
								<p>Mot de passe trop faible</p>
							) : passwordState === "good" ? (
								"presque parfait"
							) : (
								"AH parfait!"
							)}
						</div>
					</div>
					<div className="">
						<button
							type="submit"
							className="bg-[#62C247] text-white text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] md:w-[500px] pl-3 font-normal mt-3 disabled:bg-green-900 disabled:text-gray-500"
							disabled={!(passwordState === "strong")}
							// onClick={handleSignup}
						>
							Confirmer
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreatePassword;

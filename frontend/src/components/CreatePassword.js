import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";
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

	const location = useLocation();
	const Navigate = useNavigate();

	useEffect(() => {
		if (location.state === null) {
			Navigate("/404", { replace: true });
			return;
		}
		// async function tokenCheck() {
		// 	if (token) {
		// 		try {
		// 			const payload = await jwt_decode(token);
		// 			const data = await Axios.post("http://localhost:8000/api/check", {
		// 				email: payload.email,
		// 			});
		// 			if (!data) {
		// 				Navigate("/404", { replace: true });
		// 				return;
		// 			}
		// 			if (data.state === "tokenKO") {
		// 				Navigate("/404", { replace: true });
		// 			}
		// 		} catch (error) {
		// 			Navigate("/404", { replace: true });
		// 		}
		// 	}
		// }
		// tokenCheck();
	}, [Navigate, location]);

	async function handlePasswordAdd() {
		try {
			const { data } = await Axios.post(
				"http://localhost:8000/api/passwordAdd",
				{
					email: location.state.email,
					password,
				}
			);
			console.log(data);
			if (data) {
				if (data.state === "updated") {
					window.localStorage.setItem("token", data.token);
					Navigate("/config", {
						replace: true,
						state: {
							email: data.user.email,
						},
					});
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	function handlePasswordChange(event) {
		if (event.target.value === "") {
			setPasswordState("idle");
			setIsUpper(false);
			setIsSymbol(false);
			setIsNum(false);
			setLengthOk(false);
			setI(0);
			return;
		}
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
			console.log("upper");
			setIsUpper(true);
			ReactDOM.flushSync(() => {
				setI((im) => im + 1);
			});
		}
		if (!isSymbol && checkSymbol(event.target.value)) {
			console.log("symbol");
			setIsSymbol(true);
			ReactDOM.flushSync(() => {
				setI((im) => im + 1);
			});
		}
		if (!isNum && checkNumber(event.target.value)) {
			console.log("number");
			setIsNum(true);
			ReactDOM.flushSync(() => {
				setI((im) => im + 1);
			});
		}
		if (!lengthOk && event.target.value.length > 6) {
			console.log("length");
			setLengthOk(true);
			ReactDOM.flushSync(() => {
				setI((im) => im + 1);
			});
		}
		// console.log(im);
	}

	useEffect(() => {
		if (im === 0) {
			setPasswordState("idle");
		} else if (im === 1) {
			setPasswordState("weak");
		} else if (im === 2 && lengthOk) {
			setPasswordState("medium");
		} else if (im === 3 && lengthOk) {
			setPasswordState("good");
		} else if (im === 4 && lengthOk) {
			setPasswordState("strong");
		}
	}, [im, lengthOk]);

	return (
		<div className="flex justify-center">
			<div className="flex justify-center">
				<div className="signup-wrapper p-5 mt-20 flex flex-col gap-2">
					<div>
						<p className="font-poppins w-[348px] md:w-[450px] text-[25px]">
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
							onClick={handlePasswordAdd}
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

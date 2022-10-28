import React, { useState } from "react";
import { checkNumber, checkSymbol, checkUpper } from "../utils";
function CreatePassword() {
	const [isUpper, setIsUpper] = useState(false);
	const [isNum, setIsNum] = useState(false);
	const [isSymbol, setIsSymbol] = useState(false);
	const [lengthOk, setLengthOk] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordOK, setPasswordOK] = useState(false);

	const handlePasswordChange = (event) => {
		if (checkUpper(event.target.value)) {
			setIsUpper(true);
		} else {
			setIsUpper(false);
		}
		if (checkNumber(event.target.value)) {
			setIsNum(true);
		} else {
			setIsNum(false);
		}
		if (checkSymbol(event.target.value)) {
			setIsSymbol(true);
		} else {
			setIsSymbol(false);
		}
		if (event.target.value.length > 6) {
			// console.log(event.target.value.length);
			setLengthOk(true);
		} else {
			setLengthOk(false);
		}
	};

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
							type="password"
							className="bg-[#F7F7F7] text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] md:w-[500px] pl-3 font-light mt-1 text-[13px] active:border-green-500"
							placeholder="Nouveau mot de passe"
							onChange={(e) => {
								setPassword(e.target.value);
								handlePasswordChange(e);
							}}
							value={password}
						/>
					</div>
					<div className="flex gap-4 justify-between w-[360px] md:w-[500px]">
						<div className="border w-1/4"></div>
						<div className="border w-1/4"></div>
						<div className="border w-1/4"></div>
						<div className="border w-1/4"></div>
					</div>
					<div className="flex justify-end mt-1">
						<div className="text-Poppins font-thin text-[12px]">
							<p>Mot de passe trop faible</p>
						</div>
					</div>
					<div className="">
						<button
							type="submit"
							className="bg-[#62C247] text-white text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] md:w-[500px] pl-3 font-normal mt-3"
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trustpilot from "../image 13.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const handleSignup = async () => {
		const { data } = await Axios.post("http://localhost:8000/api/register", {
			email,
		});
		console.log(data);
		if (data.state === "already") {
			console.log(data);
			// window.localStorage.setItem("token", data.token);
			setEmail(data.email);
			navigate("/login", { replace: true });
		}
		if (data.state === "new") {
			// window.localStorage.setItem("token", data.token);
			setEmail(data.email);
			Axios.post("http://localhost:8000/api/confirm", {
				email,
			});
			navigate("/confirmEmail", { replace: true, state: { email } });
		} else if (data.error) {
			alert(data.error);
		}
	};

	return (
		<div className="flex justify-center">
			<div className="flex justify-center">
				<div className="signup-wrapper p-5 mt-20 flex flex-col gap-2">
					<div>
						<p className="font-poppins text-[28px]">
							Saisissez votre adresse e-mail
						</p>
					</div>
					<div className="font-light w-[367px] md:w-[500px]">
						<p className="text-[#636E72] text-[14px]">
							Vous en aurez besoin pour vous connecter et accéder à votre
							application .
						</p>
					</div>
					<div className="mt-5">
						<p className="text-black font-Poppins text-[13px]">
							Adresse e-mail
						</p>
					</div>
					<div>
						<input
							type="email"
							className="bg-[#F7F7F7] text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] md:w-[500px] pl-3 font-light mt-1 text-[13px] active:border-green-500"
							placeholder="Nathalie.durand@exemple.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div className="order-5">
						<button
							type="submit"
							className="bg-[#62C247] text-white text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] md:w-[500px] pl-3 font-normal mt-3"
							onClick={handleSignup}
						>
							Confirmer
						</button>
					</div>
					<div className="font-light w-[351px] md:w-[500px] md:order-7 mt-4">
						<p className="text-[#636E72] text-[14px] leading-[28.2px]">
							En cliquant sur Confirmer, vous acceptez notre{" "}
							<Link
								to={"/politique-de-Confidentialite"}
								className="text-black font-normal underline"
							>
								Politique de Confidentialité
							</Link>{" "}
							applicable au traitement de vos données personnelles.
						</p>
					</div>
				</div>
			</div>
			<div className="bg-green-900 w-[664px] hidden md:flex md:bg-gradient-to-r from-[#F2F8F4] to-[#F2F8F4] md:h-[790px] justify-center">
				<div className="mt-[90px]">
					<img src={trustpilot} className="w-[200px] h-[px]" alt="" />
				</div>
			</div>
		</div>
	);
}

export default Signup;

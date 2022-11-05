import React, { useState } from "react";
import { Link } from "react-router-dom";
import trustpilot from "../trustpilot.svg";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import retour from "../retour.svg";
import profile from "../profile.svg";
import arrow from "../arrow.svg";

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
		<div className="flex justify-center md:justify-around">
			<div className="flex justify-center w-1/2">
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
					<div className="mt-[10px] order-10 text-center mr-5 md:hidden">
						<button onClick={() => navigate("/", { replace: true })}>
							<img className="h-13 w-13 p-3" src={retour} alt="" />
						</button>
					</div>
				</div>
			</div>
			<div className="hidden md:flex md:flex-col md:bg-gradient-to-r from-[#F2F8F4] to-[#F2F8F4] md:h-[790px] justify-start gap-12 items-center w-1/2">
				<div className="mt-[90px]">
					<img src={trustpilot} className="w-13 h-14-" alt="" />
				</div>
				<div className="flex flex-col justify-center items-center border gap-4 bg-[#285C57] pt-5 pb-10 text-white w-[80%] rounded-3xl">
					<div>
						<img className="h-13 h-13" src={profile} alt="" />
					</div>
					<div className="w-[60%]">
						<p className="text-[16px]">
							“In the tech world, you can’t afford to be slow. Because of
							Uizard, within five days of getting my idea – with only two days
							of working in the Uizard platform – I already had a proof of
							concept.”
						</p>
					</div>
					<div>
						<img className="h-13 h-13" src={arrow} alt="" />
					</div>
				</div>
				<div className="mt-[-100px] ml-[160px] bg-[#62C247] text-white w-[160px] text-center p-3 rounded-2xl">
					<p>Nthalie Durand, WellPharma</p>
				</div>
				<div className="w-[80%] flex justify-center">
					<p className="text-[#285C57] text-[24px] text-center">
						Rejoingez +10,000 pharmaciens connectés
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;

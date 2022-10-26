import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trustpilot from "../image 13.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

/* 

  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.99992 0.833313C4.17583 0.833313 3.37025 1.07768 2.68504 1.53552C1.99984 1.99336 1.46579 2.64411 1.15042 3.40547C0.835057 4.16682 0.752543 5.0046 0.913315 5.81286C1.07409 6.62111 1.47092 7.36354 2.05364 7.94626C2.63636 8.52898 3.37879 8.92581 4.18704 9.08659C4.9953 9.24736 5.83308 9.16484 6.59443 8.84948C7.35579 8.53411 8.00654 8.00006 8.46438 7.31486C8.92222 6.62965 9.16659 5.82407 9.16659 4.99998C9.16526 3.89532 8.72585 2.83628 7.94474 2.05516C7.16362 1.27405 6.10458 0.834636 4.99992 0.833313ZM4.99992 7.49998C4.50547 7.49998 4.02212 7.35336 3.61099 7.07865C3.19987 6.80395 2.87944 6.4135 2.69022 5.95669C2.501 5.49987 2.45149 4.99721 2.54796 4.51225C2.64442 4.0273 2.88252 3.58184 3.23215 3.23221C3.58178 2.88258 4.02724 2.64448 4.51219 2.54802C4.99715 2.45155 5.49981 2.50106 5.95663 2.69028C6.41344 2.8795 6.80389 3.19993 7.07859 3.61105C7.3533 4.02218 7.49992 4.50553 7.49992 4.99998C7.49992 5.66302 7.23653 6.29891 6.76769 6.76775C6.29885 7.23659 5.66296 7.49998 4.99992 7.49998Z" fill="#B9B9B9"/>
</svg>

*/

function Signup() {
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();

		const { data } = await Axios.post("http://localhost:4000/api/register", {
			email,
		});
		console.log(data);
		if (data.state === "already") {
			navigate("/login", { replace: true });
		}
		if (data.state === "new") {
			window.localStorage.setItem("token", data.token);
			navigate("/confirm-email", { replace: true });
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

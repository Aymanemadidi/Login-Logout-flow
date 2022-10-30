import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Axios from "axios";

function ConfirmEmail() {
	const [code, setCode] = useState(null);
	const [email, setEmail] = useState("");

	const location = useLocation();
	const Navigate = useNavigate();

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		if (!token) {
			Navigate("/404", { replace: true });
			return;
		}
		async function tokenCheck() {
			try {
				const payload = await jwt_decode(token);
				const data = await Axios.post("http://localhost:8000/api/check", {
					email: payload.email,
				});
				if (!data) {
					Navigate("/404", { replace: true });
					return;
				}
				if (data.state === "tokenKO") {
					Navigate("/404", { replace: true });
				}
				setEmail(data.data.email);
			} catch (error) {
				Navigate("/404", { replace: true });
			}
		}
		tokenCheck();
	}, [Navigate]);

	useEffect(() => {
		console.log("check");
		async function check() {
			if (code && code.length === 6) {
				console.log("code: ", code.length);
				let owner = location.state.email || email;
				const res = await Axios.post("http://localhost:8000/api/checkConfirm", {
					code,
					owner,
				});
				// console.log(data);
				if (res.data.state === "success") {
					Navigate("/createPassword", {
						state: { email: owner },
						replace: true,
					});
				} else {
					alert("incorrect verification code");
				}
			}
		}

		check();
	}, [Navigate, code, email]);

	return (
		<div className="flex justify-center">
			<div className="flex justify-center">
				<div className="signup-wrapper p-5 mt-20 flex flex-col gap-2">
					<div>
						<p className="font-poppins w-[347px] md:w-[500px] text-[28px]">
							Un code de confirmation vous attend dans votre boîte e-mail
						</p>
					</div>
					<div className="font-light w-[351px] md:w-[500px] md:order-7 mt-1">
						<p className="text-[#636E72] text-[14px] leading-[28.2px]">
							Saisissez le code à 6 chiffres que nous vous avons envoyé sur
							<span
								to={"/politique-de-Confidentialite"}
								className="text-black font-normal ml-1"
							>
								{location.state.email ? location.state.email : email}
							</span>{" "}
						</p>
					</div>
					<div className="mt-5">
						<p className="text-black font-Poppins text-[13px]">
							Code de confirmation
						</p>
					</div>
					<div>
						<input
							type="text"
							className="bg-[#F7F7F7] text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] md:w-[500px] pl-3 font-light mt-1 text-[13px] active:border-green-500"
							placeholder="XXXXXX"
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
					<div className="w-[346px] md:w-[500px] md:order-7 mt-4">
						<p className="text-[#636E72] font-light text-[13px] leading-[28.2px]">
							Votre code est peut-être dans vos spams, Toujours rien ?
							<Link onClick={""}>
								<span className="text-[#62C247] font-semibold">
									Envoyer un nouveau code
								</span>
							</Link>{" "}
						</p>
					</div>
				</div>
			</div>
			<div className="bg-green-900 w-[664px] hidden md:flex md:bg-gradient-to-r from-[#F2F8F4] to-[#F2F8F4] md:h-[790px] justify-center">
				<div className="mt-[90px]">
					{/* <img src={trustpilot} className="w-[200px] h-[px]" alt="" /> */}
				</div>
			</div>
		</div>
	);
}

export default ConfirmEmail;

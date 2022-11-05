import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import check from "../check.svg";
import icon from "../icon.svg";
import logout from "../logout.svg";

function Config() {
	const [email, setEmail] = useState("");

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

	return (
		<div>
			<div>{email !== "" ? <h1>Config for {email}</h1> : ""}</div>
			<div className="flex flex-col items-center justify-center mt-[100px]">
				<div className="w-[341px] flex justify-center">
					<img
						className="h-13 w-13 p-3 rounded-full bg-[#62C247]"
						src={check}
						alt=""
					/>
				</div>
				<div className="mt-3">
					<p className="text-poppins font-[500px] text-[26px]">
						Vos identifiants sont prêts
					</p>
				</div>
				<div className="font-light w-[351px] md:w-[500px] mt-1">
					<p className="text-[#636E72] text-[14px] leading-[28.2px] text-center">
						Nous allons procéder à l'enregistrement de votre entreprise .{" "}
					</p>
				</div>
				<button className="mt-4">
					<div className="flex justify-center items-center border-none rounded-[12px] pr-5 bg-[#62C24714]">
						<div>
							<img className="h-13 w-13 p-3 rounded-full" src={icon} alt="" />
						</div>
						<div className="">
							<p className="text-11px font-[500px] text-poppins text-[#62C247]">
								Numéro de Siret de votre entreprise
							</p>
						</div>
					</div>
				</button>
				<div className="mt-[60px]">
					<button
						type="submit"
						className="bg-[#62C247] text-white text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] pl-3 font-light"
						// onClick={handleLogin}
					>
						Commencer la configuration
					</button>
				</div>
				<div className="font-light w-[351px] md:w-[500px] mt-2">
					<p className="text-[#636E72] text-[14px] leading-[28.2px]">
						Il vous manque des éléments ? Connectez-vous à tout moment pour
						finaliser l'inscription
					</p>
				</div>
				<div className="mt-[140px]">
					<button>
						<img className="h-13 w-13 p-3" src={logout} alt="" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Config;

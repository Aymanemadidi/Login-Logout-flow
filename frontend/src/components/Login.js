import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eye from "../eye.svg";
import Axios from "axios";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const Navigate = useNavigate();

	async function handleLogin() {
		try {
			const { data } = await Axios.post("http://localhost:8000/api/login", {
				email,
				password,
			});

			if (data.state === "logged") {
				alert("Login Successful");
				window.localStorage.setItem("token", data.token);

				Navigate("/home", { state: { user: data.email, token: data.token } });
			} else {
				alert("Please check your username and password");
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div className="flex justify-center">
				<div className="login-wrapper p-5 mt-20 flex flex-col gap-2">
					<div>
						<p className="font-poppins text-[24px]">Se connecter</p>
					</div>
					<div className="font-light">
						<p className="text-[#636E72]">
							Pas de compte ?
							<Link to={`/signup`} className="text-[#62C248] ml-1 font-normal">
								S'inscrire
							</Link>
						</p>
					</div>
					<div>
						<input
							type="email"
							className="bg-[#F7F7F7] text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] pl-3 font-light mt-5 text-[13px]"
							placeholder="Adresse e-mail"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>

					<div>
						<input
							type="password"
							className="bg-[#F7F7F7] text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] pl-3 font-light mt-1 text-[13px] relative"
							placeholder="Mot de passe"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className="flex mt-3 justify-between">
						<div>
							<input
								className="w-4 h-4 translate-y-[3px] rounded-md text-[#DCDCDC]"
								type="checkbox"
								name="rester"
							/>
							<label
								htmlFor="rester"
								className="ml-2 text-Poppins font-light text-[13px]"
							>
								Rester connecter
							</label>
						</div>
						<div>
							<p className="text-Poppins font-light text-[13px] mt-1">
								Mot de passe oublié ?
							</p>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="bg-[#62C247] text-white text-Poppins rounded-[7px] pt-[16px] pb-[16px] pr-[12px] w-[360px] pl-3 font-light mt-3"
							onClick={handleLogin}
						>
							Se connecter
						</button>
					</div>
				</div>
			</div>
			{/* <div className="absolute z-20 right-[35%] top-[35%]">
				<img src={eye} className="w-5 h-5" alt="" />
			</div> */}
		</>
	);
}

export default Login;

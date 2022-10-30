import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";

function Home() {
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
			<div>{email !== "" ? <h1>Home for {email}</h1> : ""}</div>
		</div>
	);
}

export default Home;

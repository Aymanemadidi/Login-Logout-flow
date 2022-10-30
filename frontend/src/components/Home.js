import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Home() {
	const Navigate = useNavigate();

	useEffect(() => {
		const token = window.localStorage.token;
		if (!token) {
			Navigate("/404", { replace: true });
		}
	}, [Navigate]);

	return (
		<div>
			<div>
				<h1>Home</h1>
			</div>
		</div>
	);
}

export default Home;

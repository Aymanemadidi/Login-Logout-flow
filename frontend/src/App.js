import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, BrowserRouter, Routes } from "react-router-dom";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

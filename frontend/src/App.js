import Login from "./components/Login";
import Signup from "./components/Signup";
import ConfirmEmail from "./components/ConfirmEmail";
import CreatePassword from "./components/CreatePassword";
import Config from "./components/Config";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { Route, BrowserRouter, Routes } from "react-router-dom";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/confirmEmail" element={<ConfirmEmail />} />
					<Route path="/createPassword" element={<CreatePassword />} />
					<Route path="/config" element={<Config />} />
					<Route path="/home" element={<Home />} />
					<Route path="/404" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

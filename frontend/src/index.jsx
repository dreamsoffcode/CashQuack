import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./components/signup";
import { Signin } from "./components/signin";
import { Navbar } from "./components/navbar";
import { Dashboard } from "./components/dashboard";
import { RecoilRoot } from "recoil";
import { Update } from "./components/update";
import { Landing } from "./components/landing";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
		{/* <App /> */}
		{/* <Navbar /> */}
		
			<Router>
				<Routes>
					<Route path="/" element={<Landing />}></Route>
					<Route path="/signup" element={<Signup />}></Route>
					<Route path="/signin" element={<Signin />}></Route>
					<Route path="/dashboard" element={<Dashboard />}></Route>
					<Route path='/update' element={<Update />}></Route>
				</Routes>
			</Router>
		</RecoilRoot>
	</React.StrictMode>,
);

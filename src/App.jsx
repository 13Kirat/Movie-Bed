import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home";

function App() {
	return (
		<div className=" bg-[#1f1e24] w-screen flex h-screen">
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;

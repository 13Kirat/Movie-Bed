import { useEffect, useState } from "react";

import Dropdown from "./Templates/Dropdown";
import Header from "./Templates/Header";
import HorizontalCards from "./Templates/HorizontalCards";
import Loading from "./Loading";
import SideNav from "./Templates/SideNav";
import TopNav from "./Templates/TopNav";
import axios from "../Utils/axios";

const Home = () => {
	document.title = "Home Page";

	const [trending, setTrending] = useState(null);

	const [wallpaper, setWallpaper] = useState(null);

	const [category, setCategory] = useState("all");

	const getHeaderWallpaper = async () => {
		try {
			const { data } = await axios.get(`trending/all/day`);
			let randomData =
				data.results[Math.floor(Math.random() * data.results.length)];
			setWallpaper(randomData);
		} catch (error) {
			console.log(error);
		}
	};

	const getTrending = async () => {
		try {
			const { data } = await axios.get(`trending/${category}/day`);
			setTrending(data.results);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(wallpaper);

	useEffect(() => {
		getTrending();
		!wallpaper && getHeaderWallpaper();
	}, [category]);

	// console.log(trending);

	return wallpaper && trending ? (
		<>
			<SideNav />
			<div className="w-[80%]  overflow-y-auto overflow-x-hidden">
				<TopNav />
				<Header data={wallpaper} />
				<div className="flex justify-between p-5">
					<h1 className="text-3xl font-semibold text-zinc-400">
						Trending
					</h1>
					<Dropdown
						title={"Filter"}
						options={["movie", "tv", "all"]}
						func={(e) => {
							setCategory(e.target.value);
						}}
					/>
				</div>
				{trending ? <HorizontalCards data={trending} /> : <Loading />}
			</div>
		</>
	) : (
		<Loading />
	);
};

export default Home;

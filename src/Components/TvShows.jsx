import { useEffect, useState } from "react";

import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import TopNav from "./Templates/TopNav";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";

const TvShows = () => {
	const navigate = useNavigate();

	const [category, setCategory] = useState("airing_today");

	const [tv, setTv] = useState([]);

	const [page, setPage] = useState(1);

	const [hasMore, setHasMore] = useState(true);

	document.title = "Tv Shows | " + category.toUpperCase();

	const getTv = async () => {
		try {
			const { data } = await axios.get(`tv/${category}?page=${page}`);
			// console.log(data);

			if (data.results.length > 0) {
				setTv((prev) => [...prev, ...data.results]);
				setPage(page + 1);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const refreshHandler = () => {
		if (tv.length === 0) {
			getTv();
		} else {
			setPage(1);
			setTv([]);
			getTv();
		}
	};

	useEffect(() => {
		refreshHandler();
	}, [category]);

	return tv.length > 0 ? (
		<div className="w-screen  h-full bg-[#1f1e24]">
			<div className="flex items-center justify-between w-full gap-5 px-10">
				<h1 className="pr-5 text-2xl font-semibold min-w-72 text-zinc-400">
					<i
						onClick={() => navigate(-1)}
						className="ri-arrow-left-line hover:text-[#6556cd]"
					></i>
					Tv Shows
					<small className="inline-block ml-2 text-sm text-zinc-600">
						({category.toUpperCase()})
					</small>
				</h1>
				<TopNav />
				<Dropdown
					title="Category"
					options={[
						"popular",
						"top_rated",
						"on_the_air",
						"airing_today",
					]}
					func={(e) => setCategory(e.target.value)}
				/>
			</div>

			<InfiniteScroll
				dataLength={tv.length}
				next={getTv}
				hasMore={hasMore}
				loader={
					<h1 className="my-10 text-center text-white text-7xl">
						Loading...
					</h1>
				}
			>
				<Cards data={tv} title="tv" />
			</InfiniteScroll>
		</div>
	) : (
		<Loading />
	);
};

export default TvShows;

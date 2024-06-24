import { useEffect, useState } from "react";

import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import TopNav from "./Templates/TopNav";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";

const Trending = () => {
	const navigate = useNavigate();

	const [category, setCategory] = useState("all");

	const [duration, setDuration] = useState("day");

	const [trending, setTrending] = useState([]);

	const [page, setPage] = useState(1);

	const [hasMore, setHasMore] = useState(true);

	document.title = "Trending | " + category.toUpperCase();

	const getTrending = async () => {
		try {
			const { data } = await axios.get(
				`trending/${category}/${duration}?page=${page}`
			);
			console.log(data)

			if (data.results.length > 0) {
				setTrending((prev) => [...prev, ...data.results]);
				setPage(page + 1);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const refreshHandler = () => {
		if (trending.length === 0) {
			getTrending();
		} else {
			setPage(1);
			setTrending([]);
			getTrending();
		}
	};

	useEffect(() => {
		// getTrending();
		refreshHandler();
	}, [category, duration]);

	return trending.length > 0 ? (
		<div className="w-screen h-full">
			<div className="flex items-center justify-between w-full gap-5 px-10">
				<h1 className="text-2xl font-semibold text-zinc-400 min-w-72">
					<i
						onClick={() => navigate(-1)}
						className="ri-arrow-left-line px-2 hover:text-[#6556cd]"
					></i>
					Trending<small className="ml-3 text-sm text-zinc-600">({category.toUpperCase()} of{" "}
					{duration.toUpperCase()})</small>
				</h1>
				<TopNav />
				<Dropdown
					title="Category"
					options={["movie", "tv", "all"]}
					func={(e) => setCategory(e.target.value)}
				/>
				<Dropdown
					title="Duration"
					options={["week", "day"]}
					func={(e) => setDuration(e.target.value)}
				/>
			</div>

			<InfiniteScroll
				dataLength={trending.length}
				next={getTrending}
				hasMore={hasMore}
				loader={
					<h1 className="my-10 text-center text-white text-7xl">
						Loading...
					</h1>
				}
			>
				<Cards data={trending} title={category} />
			</InfiniteScroll>
		</div>
	) : (
		<Loading />
	);
};

export default Trending;

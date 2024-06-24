import { useEffect, useState } from "react";

import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import TopNav from "./Templates/TopNav";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";

const Popular = () => {
	const navigate = useNavigate();

	const [category, setCategory] = useState("tv");

	const [popular, setPopular] = useState([]);

	const [page, setPage] = useState(1);

	const [hasMore, setHasMore] = useState(true);

	document.title = "Popular | " + category.toUpperCase();

	const getPopular = async () => {
		try {
			const { data } = await axios.get(
				`${category}/popular?page=${page}`
			);

			if (data.results.length > 0) {
				setPopular((prev) => [...prev, ...data.results]);
				setPage(page + 1);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const refreshHandler = () => {
		if (popular.length === 0) {
			getPopular();
		} else {
			setPage(1);
			setPopular([]);
			getPopular();
		}
	};

	useEffect(() => {
		// getPopular();
		refreshHandler();
	}, [category]);

	return popular.length > 0 ? (
		<div className="w-screen h-full bg-[#1f1e24]">
			<div className="flex items-center justify-between w-full gap-5 px-10">
				<h1 className="text-2xl font-semibold text-zinc-400">
					<i
						onClick={() => navigate(-1)}
						className="ri-arrow-left-line px-2 hover:text-[#6556cd]"
					></i>
					Popular
					<small className="ml-3 text-sm text-zinc-600 ">
						({category.toUpperCase()})
					</small>
				</h1>
				<TopNav />
				<Dropdown
					title="Category"
					options={["movie", "person", "tv"]}
					func={(e) => setCategory(e.target.value)}
				/>
			</div>

			<InfiniteScroll
				dataLength={popular.length}
				next={getPopular}
				hasMore={hasMore}
				loader={
					<h1 className="my-10 text-center text-white text-7xl">
						Loading...
					</h1>
				}
			>
				<Cards data={popular} title={category} />
			</InfiniteScroll>
		</div>
	) : (
		<Loading />
	);
};

export default Popular;

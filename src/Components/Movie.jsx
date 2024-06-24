import { useEffect, useState } from "react";

import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import TopNav from "./Templates/TopNav";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";

const Movie = () => {
	const navigate = useNavigate();

	const [category, setCategory] = useState("now_playing");

	const [movie, setMovie] = useState([]);

	const [page, setPage] = useState(1);

	const [hasMore, setHasMore] = useState(true);

	document.title = "Movie | " + category.toUpperCase();

	const getMovie = async () => {
		try {
			const { data } = await axios.get(
				`movie/${category}?page=${page}`
			);
			console.log(data)

			if (data.results.length > 0) {
				setMovie((prev) => [...prev, ...data.results]);
				setPage(page + 1);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const refreshHandler = () => {
		if (movie.length === 0) {
			getMovie();
		} else {
			setPage(1);
			setMovie([]);
			getMovie();
		}
	};

	useEffect(() => {
		// getPopular();
		refreshHandler();
	}, [category]);

	return movie.length > 0 ? (
		<div className="w-screen h-full bg-[#1f1e24]">
			<div className="flex items-center justify-between w-full gap-5 px-10">
				<h1 className="pr-5 text-2xl font-semibold text-zinc-400">
					<i
						onClick={() => navigate(-1)}
						className="ri-arrow-left-line px-2 hover:text-[#6556cd]"
					></i>
					Movie<small className="ml-3 text-sm text-zinc-600">({category.toUpperCase()})</small>
				</h1>
				<TopNav />
				<Dropdown
					title="Category"
					options={[
						"popular",
						"top_rated",
						"upcoming",
						"now_playing",
					]}
					func={(e) => setCategory(e.target.value)}
				/>
			</div>

			<InfiniteScroll
				dataLength={movie.length}
				next={getMovie}
				hasMore={hasMore}
				loader={
					<h1 className="my-10 text-center text-white text-7xl">
						Loading...
					</h1>
				}
			>
				<Cards data={movie} title="movie" />
			</InfiniteScroll>
		</div>
	) : (
		<Loading />
	);
};

export default Movie;

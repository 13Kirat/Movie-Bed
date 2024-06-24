import { useEffect, useState } from "react";

import Cards from "./Templates/Cards";
import Dropdown from "./Templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import TopNav from "./Templates/TopNav";
import axios from "../Utils/axios";
import { useNavigate } from "react-router-dom";

const Person = () => {
	const navigate = useNavigate();

	const [category, setCategory] = useState("popular");

	const [person, setPerson] = useState([]);

	const [page, setPage] = useState(1);

	const [hasMore, setHasMore] = useState(true);

	document.title = "People | " + category.toUpperCase();

	const getPerson = async () => {
		try {
			const { data } = await axios.get(`person/${category}?page=${page}`);
			console.log(data);

			if (data.results.length > 0) {
				setPerson((prev) => [...prev, ...data.results]);
				setPage(page + 1);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const refreshHandler = () => {
		if (person.length === 0) {
			getPerson();
		} else {
			setPage(1);
			setPerson([]);
			getPerson();
		}
	};

	useEffect(() => {
		refreshHandler();
	}, [category]);
    
	return person.length > 0 ? (
		<div className="w-screen  h-full bg-[#1f1e24]">
			<div className="flex items-center justify-between w-full gap-5 px-10">
				<h1 className="pr-5 text-2xl font-semibold min-w-72 text-zinc-400">
					<i
						onClick={() => navigate(-1)}
						className="ri-arrow-left-line hover:text-[#6556cd]"
					></i>
					People
					<small className="inline-block ml-2 text-sm text-zinc-600">
						({category.toUpperCase()})
					</small>
				</h1>
				<TopNav />
			</div>

			<InfiniteScroll
				dataLength={person.length}
				next={getPerson}
				hasMore={hasMore}
				loader={
					<h1 className="my-10 text-center text-white text-7xl">
						Loading...
					</h1>
				}
			>
				<Cards data={person} title="person" />
			</InfiniteScroll>
		</div>
	) : (
		<Loading />
	);
};

export default Person;

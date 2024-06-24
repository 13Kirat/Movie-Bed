import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "../../Utils/axios"; // Ensure this path is correct

const TopNav = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]); // State to store search results

	const getSearchs = async () => {
		if (query.trim() === "") {
			setResults([]); // Clear results if query is empty
			return;
		}

		try {
			const { data } = await axios.get(`/search/multi?query=${query}`);
			setResults(data.results); // Update results with the data from the API
			console.log(data.results);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			getSearchs();
		}, 300); // Add a debounce to avoid too many API calls

		return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
	}, [query]);

	return (
		<div className="w-screen h-[10vh] relative flex justify-start items-center pl-[15%]">
			<i className="text-3xl text-zinc-400 ri-search-2-line"></i>
			<input
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				className="w-[50%] mx-5 p-5 txl outline-none border-none bg-transparent text-white"
				type="text"
				placeholder="Search Anything"
			/>
			{query.length > 0 && (
				<i
					onClick={() => setQuery("")}
					className="text-3xl text-zinc-400 ri-close-fill"
				></i>
			)}

			<div className="max-h-[60vh] w-[60%] absolute top-[100%] left-[15vw] z-20 bg-zinc-200 overflow-y-auto overflow-x-hidden rounded-md">
				{results.map((data, index) => (
					<Link
						key={index}
						to={`/${data.media_type}/details/${data.id}`} // Assuming you have a route to handle this
						className="z-20 flex items-center justify-start gap-10 p-8 font-semibold duration-300 border-b-2 hover:bg-zinc-300 hover:text-black text-zinc-600 border-zinc-100"
					>
						<img
							className="h-[15vh] w-[10vw] object-cover rounded shadow-lg"
							src={
								data.backdrop_path ||
								data.poster_path ||
								data.profile_path
									? `https://image.tmdb.org/t/p/original${
											data.backdrop_path ||
											data.poster_path ||
											data.profile_path
									}`
									: "https://plus.unsplash.com/premium_photo-1680303237111-35809e47fcc1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt={
								data.title ||
								data.original_title ||
								data.name
							}
						/>
						<span className="text-2xl">
							{data.title ||
								data.original_title ||
								data.name ||
								data.original_name}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TopNav;

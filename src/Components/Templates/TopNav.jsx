import { Link } from "react-router-dom";
import { useState } from "react";

const TopNav = () => {
	const [query, setQuery] = useState("");
	return (
		<div className="w-full h-[10vh] relative flex justify-start items-center ml-[15%]">
			<i className="text-3xl text-zinc-400 ri-search-2-line"></i>
			<input
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				className="w-[50%] mx-10 p-5 txl outline-none border-none bg-transparent text-white"
				type="text"
				placeholder="Search Anything"
			/>
			{query.length > 0 && (
				<i onClick={()=>setQuery("")} className="text-3xl text-zinc-400 ri-close-fill"></i>
			)}

			<div className="m-h-[50vh] w-[50%] absolute top-[90%]  bg-zinc-200 overflow-y-auto overflow-x-hidden rounded">
				<Link className="flex items-center justify-start p-10 font-semibold duration-300 border-b-2 hover:bg-zinc-300 hover:text-black text-zinc-600 border-zinc-100">
					<img src="" alt="" />
					<span>Hello world </span>
				</Link>
				
			</div>
		</div>
	);
};

export default TopNav;

import { Link } from "react-router-dom";

const SideNav = () => {
	return (
		<div className="h-full w-[20%] border-r-2 border-zinc-400 p-10 overflow-y-auto sticky overflow-x-hidden left-0 top-0">
			<h1 className="text-2xl font-bold text-white">
				<i className=" text-[#6556cd] ri-tv-fill mr-3"></i>
				<span>Movie</span>
			</h1>
			<nav className="flex flex-col gap-3 text-xl text-zinc-400">
				<h1 className="mt-10 mb-5 text-xl font-semibold text-white">
					New Feeds
				</h1>
				<Link to={"/trending"} className="hover:bg-[#6556cd] p-5 hover:text-white rounded-lg duration-300">
					<i className="mr-2 ri-fire-fill"></i>Trending
				</Link>
				<Link to={"/popular"} className="hover:bg-[#6556cd] p-5 hover:text-white rounded-lg duration-300">
					<i className="mr-2 ri-bard-fill"></i>Popular
				</Link>
				<Link to={"/movie"} className="hover:bg-[#6556cd] p-5 hover:text-white rounded-lg duration-300">
					<i className="mr-2 ri-movie-2-fill"></i>Movies
				</Link>
				<Link to={"/tv"} className="hover:bg-[#6556cd] p-5 hover:text-white rounded-lg duration-300">
					<i className="mr-2 ri-tv-2-fill"></i>TV Shows
				</Link>
				<Link to={"/person"} className="hover:bg-[#6556cd] p-5 hover:text-white rounded-lg duration-300">
					<i className="mr-2 ri-team-fill"></i>People
				</Link>
			</nav>

			<hr className="border-none h-[1px] bg-zinc-400" />

			<nav className="flex flex-col gap-3 text-xl text-zinc-400">
				<h1 className="mt-10 mb-5 text-xl font-semibold text-white">
					Web Site Information
				</h1>
				<Link className="hover:bg-[#6556cd] p-5 hover:text-white rounded-lg duration-300">
					<i className="mr-2 ri-information-fill"></i>Popular
				</Link>
				<Link className="hover:bg-[#6556cd] p-5 hover:text-white rounded-lg duration-300">
					<i className="mr-2 ri-phone-fill"></i>Contact Us
				</Link>
			</nav>
		</div>
	);
};

export default SideNav;

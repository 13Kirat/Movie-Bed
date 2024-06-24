import { Link } from "react-router-dom";

const Header = ({ data }) => {
	// console.log(data);
	return (
		data && (
			<div
				className="w-full h-[70vh] flex flex-col justify-end items-start p-[5%]"
				style={{
					background: `url(https://image.tmdb.org/t/p/original${
						data.backdrop_path ||
						data.poster_path ||
						data.profile_path
					}`,
					// backgroundPosition: "center center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<h1 className="text-5xl w-[70%] font-black text-white mix-blend-difference">
					{data.title ||
						data.original_title ||
						data.name ||
						data.original_name}
				</h1>
				{data.overview && (
					<p className="w-[70%] my-3 text-white mix-blend-difference">
						{data.overview}...
						<Link
							to={`${data.media_type}/details/${data.id}`}
							className="text-blue-400"
						>
							more
						</Link>
					</p>
				)}
				<p className="text-white mix-blend-difference">
					<i className="text-yellow-400 ri-megaphone-fill"></i>
					{data.release_date || "No Information"}
					<i className="ml-5 text-yellow-400 ri-album-fill"></i>
					{data.media_type.toUpperCase()}
				</p>
				<Link to={`${data.media_type}/details/${data.id}/trailer`} className="p-4 text-white rounded font-semibold mt-5 bg-[#6556cd]">
					Watch Trailer
				</Link>
			</div>
		)
	);
};

export default Header;

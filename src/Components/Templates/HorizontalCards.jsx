import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
	// console.log(data);
	return data ? (
		<div className="w=[100%] h-[60vh] flex overflow-x-auto  overflow-y-hidden m-5">
			{data.length > 0 &&
				data.map((data, index) => (
					<Link
						to={`/${data.media_type}/details/${data.id}`}
						key={index}
						className="min-w-[20%] h-full mr-5 bg-zinc-900 mb-5"
					>
						<img
							className="w-full h-[40vh] aspect-auto object-cover"
							src={
								data.poster_path ||
								data.backdrop_path ||
								data.profile_path
									? `https://image.tmdb.org/t/p/original${
											data.poster_path ||
											data.backdrop_path ||
											data.profile_path
									  }`
									: "https://plus.unsplash.com/premium_photo-1680303237111-35809e47fcc1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt=""
						/>
						<div className="p-3 h-[20vh] overflow-y-scroll overflow-hidden text-white ">
							<h1 className="pt-3 text-xl font-semibold ">
								{data.title ||
									data.original_title ||
									data.name ||
									data.original_name}
							</h1>

							{data.overview && (
								<p className="py-3 text-sm text-zinc-500 ">
									{data.overview.slice(0, 80)}...
									<span className="text-zinc-600">more</span>
								</p>
							)}
						</div>
					</Link>
				))}
		</div>
	) : (
		<h1 className="text-3xl font-black text-white">Nothing To Show</h1>
	);
};

export default HorizontalCards;

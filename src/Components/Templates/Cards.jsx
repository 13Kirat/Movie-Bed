import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
	console.log(data);
	return (
		<div className="grid items-center w-screen px-10 grid-cols-5 gap-12 gap bg-[#1f1e24]">
			{data.map((card, index) => (
				<Link
					to={`/${card.media_type || title}/details/${card.id}`}
					key={index}
					className="relative "
				>
					<img
						src={
							card.poster_path ||
							card.backdrop_path ||
							card.profile_path
								? `https://image.tmdb.org/t/p/original${
										card.poster_path ||
										card.backdrop_path ||
										card.profile_path
								  }`
								: "https://plus.unsplash.com/premium_photo-1680303237111-35809e47fcc1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						alt=""
						className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover"
					/>
					<h1 className="mt-3 text-xl font-semibold text-zinc-400 ">
						{card.title ||
							card.original_title ||
							card.name ||
							card.original_name}
					</h1>

					{card.vote_average !== NaN && title !== "person" && (
						<div className="text-white text-xl font-semibold bg-yellow-600 w-[50px] rounded-full h-[50px] absolute right-[-10%] top-[65%] flex justify-center items-center">
							{(card.vote_average * 10).toFixed()} <sup>%</sup>
						</div>
					)}
				</Link>
			))}
		</div>
	);
};

export default Cards;

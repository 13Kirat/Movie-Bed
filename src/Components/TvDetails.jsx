import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { asyncLoadTv, removeTv } from "../Store/Actions/TvAction";
import { useDispatch, useSelector } from "react-redux";

import HorizontalCards from "./Templates/HorizontalCards";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { useEffect } from "react";

const TvDetails = () => {
	const { pathname } = useLocation();

	const navigate = useNavigate();

	const { info } = useSelector((state) => state.tv);

	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncLoadTv(id));
		return () => {
			dispatch(removeTv());
		};
	}, [id]);
	return info ? (
		<div
			className="relative w-screen h-screen px-20 overflow-x-hidden overflow-y-auto aspect-auto "
			style={{
				background: `url(https://image.tmdb.org/t/p/original${
					info.details.backdrop_path ||
					info.poster_path ||
					info.profile_path
				}`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* navbar */}
			<nav className="flex opacity-100 w-full gap-10 text-xl items-center h-[10vh] text-zinc-100">
				<Link
					onClick={() => navigate(-1)}
					className="ri-arrow-left-line px-2 hover:text-[#6556cd]"
				></Link>
				<a target="_blank" title="Site" href={info.details.homepage}>
					<i className="hover:text-[#6556cd] ri-earth-fill"></i>
				</a>
				<a
					target="_blank"
					href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
					title="Wikidata"
				>
					<i className="hover:text-[#6556cd] ri-external-link-fill"></i>
				</a>
				<a
					target="_blank"
					href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`}
					title="IMDB"
					className="hover:text-[#6556cd]"
				>
					IMDB
				</a>
			</nav>

			<div className="bg-[rgba(0,0,0,0.7)]  p-10 text-zinc-100 rounded-lg">
				{/* top section */}
				<div className="flex flex-col w-full mb-10">
					<div className="flex w-full gap-12 ">
						<img
							src={
								`https://image.tmdb.org/t/p/original${
									info.details.poster_path ||
									info.details.backdrop_path ||
									info.details.profile_path
								}` ||
								"https://plus.unsplash.com/premium_photo-1680303237111-35809e47fcc1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt=""
							className=" shadow-[8px_17px_38px_2px_rgba(255,255,255,0.5)] h-auto w-64 aspect-video object-cover"
						/>
						<div className="">
							<h1 className="text-5xl font-black ">
								{info.details.title ||
									info.details.original_title ||
									info.details.name ||
									info.details.original_name}
								<small className="pl-5 text-2xl font-bold ">
									(
									{info.details.first_air_date &&
										info.details.first_air_date.split(
											"-"
										)[0]}
									)
								</small>
							</h1>
							<div className="grid grid-cols-4 gap-10 mb-3 font-semibold text-md mt-7">
								<h1 className="">
									User Score :{" "}
									<span className="p-2 text-lg font-bold text-white bg-yellow-600 rounded-full ">
										{(
											info.details.vote_average * 10
										).toFixed()}
										<sup>%</sup>
									</span>
								</h1>
								<h1>
									Release Date : {<br />} (
									{info.details.first_air_date})
								</h1>
								<h1>
									Genres : (
									{info.details.genres &&
										info.details.genres
											.map((g, i) => g.name)
											.join(",")}
									)
								</h1>
								<h1>Runtime : ({info.details.runtime}min)</h1>
							</div>

							<div className="">
								<h1 className="text-xl italic font-semibold underline ">
									{info.details.tagline}
								</h1>
								<h1 className="mt-5 mb-3 text-2xl">
									Overview :
								</h1>
								<p>{info.details.overview}</p>
								<h1 className="mt-5 mb-3 text-2xl">
									Movie Translated :
								</h1>
								<p className="mb-10">
									{info.translations.join(", ")}
								</p>

								<Link
									className="p-5  bg-[#6556cd] rounded-lg"
									to={`${pathname}/trailer`}
								>
									<i className="pr-3 text-xl ri-play-fill"></i>
									Play Trailer
								</Link>
							</div>
						</div>
					</div>
				</div>
				<hr />

				{/* Available on platform */}
				<div className="">
					<div className="flex flex-col my-5">
						<div className="flex gap-5 ">
							{info.watchProviders &&
								info.watchProviders.flatrate && (
									<div className="flex gap-x-10">
										<h1 className="text-2xl w-60">
											Available on Flatrate :
										</h1>
										{info.watchProviders.flatrate.map(
											(w, i) => (
												<img
													key={i}
													title={w.provider_name}
													className="w-[3vw] h-[3vw] rounded-md object-cover"
													src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
												/>
											)
										)}
									</div>
								)}
						</div>
						<div className="flex gap-5 ">
							{info.watchProviders &&
								info.watchProviders.rent && (
									<div className="flex gap-x-10">
										<h1 className="text-2xl w-60">
											Available on Rent :
										</h1>
										{info.watchProviders.rent.map(
											(w, i) => (
												<img
													key={i}
													title={w.provider_name}
													className="w-[3vw] h-[3vw] rounded-md object-cover"
													src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
												/>
											)
										)}
									</div>
								)}
						</div>

						<div className="flex gap-5 ">
							{info.watchProviders && info.watchProviders.buy && (
								<div className="flex gap-x-10">
									<h1 className="text-2xl w-60">
										Available to Buy :
									</h1>
									{info.watchProviders.buy.map((w, i) => (
										<img
											key={i}
											title={w.provider_name}
											className="w-[3vw] h-[3vw] rounded-md object-cover"
											src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* seasons */}
				<hr />
				<div className="">
					<h1 className="mt-5 text-3xl font-bold text-white">
						Seasons :
					</h1>
					<div className="h-[60vh] w-full flex whitespace-nowrap gap-10 overflow-x-auto overflow-y-hidden mb-5 p-5">
						{info.details.seasons.length > 0 ? (
							info.details.seasons.map((s, i) => (
								<div className="flex flex-col w-[25vw]">
									<img
										className="min-w-[15vw] min-h-[40vh] aspect-auto shadow-[8px_17px_38px_2px_rgba(255,255,255,0.5)] object-cover"
										src={
											s.backdrop_path ||
											s.poster_path ||
											s.profile_path
												? `https://image.tmdb.org/t/p/original${
														s.backdrop_path ||
														s.poster_path ||
														s.profile_path
												  }`
												: "https://plus.unsplash.com/premium_photo-1680303237111-35809e47fcc1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
										}
										alt=""
									/>
									<h1 className="mt-3 text-xl font-semibold ">
										{s.title ||
											s.original_title ||
											s.name ||
											s.original_name}
									</h1>
								</div>
							))
						) : (
							<NotFound />
						)}
					</div>
				</div>

				{/* recommendations */}
				<hr />
				<h1 className="mt-5 text-3xl font-bold text-white">
					Recommendations and Similar Stuff :
				</h1>
				<HorizontalCards
					data={
						info.recommendations
							? info.recommendations
							: info.similars
					}
				/>

				<Outlet />
			</div>
		</div>
	) : (
		<Loading />
	);
};

export default TvDetails;

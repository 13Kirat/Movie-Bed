import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { asyncLoadPerson, removePerson } from "../Store/Actions/PersonAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Dropdown from "./Templates/Dropdown";
import HorizontalCards from "./Templates/HorizontalCards";
import Loading from "./Loading";

const PersonDetails = () => {
	const { pathname } = useLocation();

	const [category, setCategory] = useState("movie");

	const navigate = useNavigate();

	const { info } = useSelector((state) => state.person);
	console.log(info);

	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncLoadPerson(id));
		return () => {
			dispatch(removePerson());
		};
	}, [id]);
	return info ? (
		<div className="w-screen h-full px-24">
			<nav className="flex w-full gap-10 text-xl items-center h-[10vh] text-zinc-100">
				<Link
					onClick={() => navigate(-1)}
					className="ri-arrow-left-line px-2 hover:text-[#6556cd]"
				></Link>
			</nav>
			<div className="flex w-full gap-16">
				<div className="w-[20%]">
					<img
						src={
							`https://image.tmdb.org/t/p/original${
								info.details.profile_path ||
								info.details.poster_path ||
								info.details.backdrop_path
							}` ||
							"https://plus.unsplash.com/premium_photo-1680303237111-35809e47fcc1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						alt=""
						className=" shadow-[8px_17px_38px_2px_rgba(255,255,255,0.5)] h-96 w-64 aspect-video object-cover"
					/>
					<hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
					<div className="flex text-2xl gap-x-5 text-zinc-100">
						{info.externalIds.wikidata_id && (
							<a
								target="_blank"
								href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
								title="Wikidata"
							>
								<i className="hover:text-[#6556cd] ri-external-link-fill"></i>
							</a>
						)}
						{info.externalIds.facebook_id && (
							<a
								target="_blank"
								href={`https://www.facebook.com/${info.externalIds.facebook_id}`}
								title="Facebook"
							>
								<i className="hover:text-[#6556cd] ri-facebook-circle-fill"></i>
							</a>
						)}
						{info.externalIds.instagram_id && (
							<a
								target="_blank"
								href={`https://www.instagram.com/${info.externalIds.instagram_id}`}
								title="Instagram"
							>
								<i className="hover:text-[#6556cd] ri-instagram-fill"></i>
							</a>
						)}
						{info.externalIds.twitter_id && (
							<a
								target="_blank"
								href={`https://x.com/${info.externalIds.twitter_id}`}
								title="Twitter"
							>
								<i className="hover:text-[#6556cd] ri-twitter-x-fill"></i>
							</a>
						)}
						{info.externalIds.youtube_id && (
							<a
								target="_blank"
								href={`https://www.youtube.com/${info.externalIds.youtube_id}`}
								title="Youtube"
							>
								<i className="hover:text-[#6556cd] ri-youtube-fill"></i>
							</a>
						)}
					</div>
					<h1 className="my-5 text-2xl font-semibold text-zinc-400">
						Personal Info
					</h1>

					{info.details.known_for_department && (
						<>
							<h1 className="text-lg font-semibold text-zinc-400">
								Known For :{" "}
							</h1>
							<h1 className="font-semibold text-zinc-400">
								{info.details.known_for_department}
							</h1>
						</>
					)}

					{info.details.gender && (
						<>
							<h1 className="mt-3 text-lg font-semibold text-zinc-400">
								Gender :{" "}
							</h1>
							<h1 className="font-semibold text-zinc-400">
								{info.details.gender === 2 ? "Male" : "Female"}
							</h1>
						</>
					)}

					{info.details.birthday && (
						<>
							<h1 className="mt-3 text-lg font-semibold text-zinc-400">
								Birth Date :{" "}
							</h1>
							<h1 className="font-semibold text-zinc-400">
								{info.details.birthday}
							</h1>
						</>
					)}

					{info.details.deathday && (
						<>
							<h1 className="mt-3 text-lg font-semibold text-zinc-400">
								Death Date :{" "}
							</h1>
							<h1 className="font-semibold text-zinc-400">
								{info.details.deathday}
							</h1>{" "}
						</>
					)}
					{info.details.place_of_birth && (
						<>
							<h1 className="mt-3 text-lg font-semibold text-zinc-400">
								Place of Birth :
							</h1>
							<h1 className="font-semibold text-zinc-400">
								{info.details.place_of_birth}
							</h1>{" "}
						</>
					)}
					{info.details.also_known_as && (
						<>
							<h1 className="mt-3 text-lg font-semibold text-zinc-400">
								Also Known As :
							</h1>
							<h1 className="font-semibold text-zinc-400">
								{info.details.also_known_as.join(", ")}
							</h1>{" "}
						</>
					)}
				</div>
				<div className="w-[80%]">
					<h1 className="my-5 text-6xl font-black text-zinc-400">
						{info.details.name}
					</h1>

					{info.details.biography && (
						<>
							<h1 className="text-xl font-semibold text-zinc-400">
								Biography :
							</h1>
							<p className="mt-3 text-zinc-400">
								{info.details.biography}
							</p>
						</>
					)}

					{info.combinedCredits.cast && (
						<>
							<h1 className="mt-5 text-lg font-semibold text-zinc-400">
								Summery :
							</h1>
							<HorizontalCards data={info.combinedCredits.cast} />
							<div className="flex justify-between w-full">
								<h1 className="my-5 text-2xl font-semibold text-zinc-400">
									Acting
								</h1>

								<Dropdown
									title={"Category"}
									options={["tv", "movie"]}
									func={(e) => setCategory(e.target.value)}
								/>
							</div>

							<div className="w-full overflow-x-hidden overflow-y-auto shadow-xl mb-10  h-[50vh] border-2 border-zinc-700 p-5 text-zinc-400 list-disc shadow-[rgba(255,255,255,0.3)] mt-5">
								{info[category + "Credits"].cast.map((c, i) => (
									<li
										key={i}
										className="p-5 duration-300 rounded cursor-pointer hover:bg-[#19191d] hover:text-white"
									>
										<Link
											to={`/${category}/details/${c.id}`}
										>
											<span>
												Movie Name :{" "}
												{c.title ||
													c.original_title ||
													c.name ||
													c.original_name}
											</span>
											{c.character && (
												<span className="block mt-2 ml-5">
													Character Name :{" "}
													{c.character}
												</span>
											)}
										</Link>
									</li>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	) : (
		<Loading />
	);
};

export default PersonDetails;

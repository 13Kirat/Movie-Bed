import { Link, useLocation, useNavigate } from "react-router-dom";

import NotFound from "../NotFound";
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const Trailer = () => {
	const { pathname } = useLocation();

	const navigate = useNavigate();
    
	const category = pathname.includes("movie") ? "movie" : "tv";

	const ytVideo = useSelector((state) => state[category].info.videos);

	return (
		<div className="absolute top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.9)]">
			<Link
				onClick={() => navigate(-1)}
				className="ri-close-fill px-2 absolute top-10 left-10 text-3xl text-white hover:text-[#6556cd]"
			></Link>
			{ytVideo ? <ReactPlayer
				width={"80vw"}
				controls
				height={"80vh"}
				url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
			/> : <NotFound/>}
		</div>
	);
};

export default Trailer;

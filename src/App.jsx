import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home";
import Movie from "./Components/Movie";
import MovieDetails from "./Components/MovieDetails";
import NotFound from "./Components/NotFound";
import Person from "./Components/Person";
import PersonDetails from "./Components/PersonDetails";
import Popular from "./Components/Popular";
import Trailer from "./Components/Templates/Trailer";
import Trending from "./Components/Trending";
import TvDetails from "./Components/TvDetails";
import TvShows from "./Components/TvShows";

function App() {
	return (
		<div className=" bg-[#1f1e24] flex">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/trending" element={<Trending />} />
				<Route path="/popular" element={<Popular />} />
				<Route path="/movie" element={<Movie />} />
				<Route path="/movie/details/:id" element={<MovieDetails />}>
					<Route
						path="/movie/details/:id/trailer"
						element={<Trailer />}
					/>
				</Route>
				<Route path="/tv" element={<TvShows />} />
				<Route path="/tv/details/:id" element={<TvDetails />}>
					<Route
						path="/tv/details/:id/trailer"
						element={<Trailer />}
					/>
				</Route>
				<Route path="/person" element={<Person />} />
				<Route path="/person/details/:id" element={<PersonDetails />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;

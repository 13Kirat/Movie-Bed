export { loadMovie, removeMovie } from "../Reducers/MovieSlice";

import axios from "../../Utils/axios";
import { loadMovie } from "./MovieAction";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
	try {
		const detail = await axios.get(`/movie/${id}`);
		const externalId = await axios.get(`/movie/${id}/external_ids`);
		const recommendation = await axios.get(`/movie/${id}/recommendations`);
		const similar = await axios.get(`/movie/${id}/similar`);
		const translation = await axios.get(`/movie/${id}/translations`);
		const video = await axios.get(`/movie/${id}/videos`);
		const watchProvider = await axios.get(`/movie/${id}/watch/providers`);
		let allDetails = {
			details: detail.data,
			externalIds: externalId.data,
			recommendations: recommendation.data.results,
			similars: similar.data.results,
			translations: translation.data.translations.map((t) => t.name),
			// videos: video.data.results,
			videos: video.data.results.find(
				(value) => value.type === "Trailer"
			),
			watchProviders: watchProvider.data.results.IN,
		};

		dispatch(loadMovie(allDetails));
		// console.log(allDetails);
	} catch (error) {
		console.log(error);
	}
};

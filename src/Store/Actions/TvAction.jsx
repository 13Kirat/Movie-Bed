export { loadTv, removeTv } from "../Reducers/TvSlice";

import axios from "../../Utils/axios";
import { loadTv } from "./TvAction";

export const asyncLoadTv = (id) => async (dispatch, getState) => {
	try {
		const detail = await axios.get(`/tv/${id}`);
		const externalId = await axios.get(`/tv/${id}/external_ids`);
		const recommendation = await axios.get(`/tv/${id}/recommendations`);
		const similar = await axios.get(`/tv/${id}/similar`);
		const translation = await axios.get(`/tv/${id}/translations`);
		const video = await axios.get(`/tv/${id}/videos`);
		const watchProvider = await axios.get(`/tv/${id}/watch/providers`);
		let allDetails = {
			details: detail.data,
			externalIds: externalId.data,
			recommendations: recommendation.data.results,
			similars: similar.data.results,
			translations: translation.data.translations.map((t) => t.name),
			videos: video.data.results.find(
				(value) => value.type === "Trailer"
			),
			watchProviders: watchProvider.data.results.IN,
		};

		dispatch(loadTv(allDetails));
		console.log(allDetails);
	} catch (error) {
		console.log(error);
	}
};

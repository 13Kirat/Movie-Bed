export { loadPerson, removePerson } from "../Reducers/PersonSlice";

import axios from "../../Utils/axios";
import { loadPerson } from "./PersonAction";

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
	try {
		const detail = await axios.get(`/person/${id}`);
		const externalId = await axios.get(`/person/${id}/external_ids`);
		const combinedCredit = await axios.get(
			`/person/${id}/combined_credits`
		);
		const movieCredit = await axios.get(`/person/${id}/movie_credits`);
		const tvCredit = await axios.get(`/person/${id}/tv_credits`);

		let allDetails = {
			details: detail.data,
			externalIds: externalId.data,
			combinedCredits: combinedCredit.data,
			movieCredits: movieCredit.data,
			tvCredits: tvCredit.data,
		};

		dispatch(loadPerson(allDetails));
		console.log(allDetails);
	} catch (error) {
		console.log(error);
	}
};

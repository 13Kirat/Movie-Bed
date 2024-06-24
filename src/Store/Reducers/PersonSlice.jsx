import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	info: null,
};

export const PersonSlice = createSlice({
	name: "person",
	initialState,
	reducers: {
		loadPerson: (state, action) => {
			state.info = action.payload;
		},
		removePerson: (state, action) => {
			state.info = null;
		},
	},
});

export const { loadPerson, removePerson } = PersonSlice.actions;

export default PersonSlice.reducer;

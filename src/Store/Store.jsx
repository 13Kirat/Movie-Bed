import MovieReducer from "./Reducers/MovieSlice";
import PersonReducer from "./Reducers/PersonSlice";
import TvReducer from "./Reducers/TvSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		movie: MovieReducer,
		tv: TvReducer,
		person: PersonReducer,
	},
});

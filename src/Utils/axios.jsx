import axios from "axios";

const Instance = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzNjZTVkZDlmOWUwN2JkYWE2MzBkNzY2OTFmZmU2ZSIsInN1YiI6IjY2NjcyMzkyZjViMDA2YjJhM2I5Y2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.03dqeRbXNScHRdrVe0c72UjphILYt0cIYwEBIh-QEMg",
	},
});

export default Instance;

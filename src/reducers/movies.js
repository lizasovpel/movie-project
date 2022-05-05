const initialState = {
	movies: [],
	moviesLoadingStatus: "idle",
};

const movies = (state = initialState, action) => {
	switch (action.type) {
		case "MOVIES_FETCHING":
			return {
				...state,
				moviesLoadingStatus: "loading",
			};
		case "MOVIES_FETCHED":
			return {
				...state,
				moviesLoadingStatus: "idle",
				movies: action.payload.results,
			};
		case "MOVIES_FETCHING_ERROR":
			return {
				...state,
				moviesLoadingStatus: "error",
			};
		case "ACTIVE_GENRE_CHANGED":
			return {
				...state,
				movies: [],
			};
		default:
			return state;
	}
};

export default movies;

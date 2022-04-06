const initialState = {
	movies: [],
	moviesLoadingStatus: "idle",
	genres: [],
	genresLoadingStatus: "idle",
	activeGenre: "all",
};

const reducer = (state = initialState, action) => {
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
		case "GENRES_FETCHING":
			return {
				...state,
				genresLoadingStatus: "loading",
			};
		case "GENRES_FETCHED":
			return {
				...state,
				genres: action.payload,
			};
		case "GENRES_FETCHING_ERROR":
			return {
				...state,
				genresLoadingStatus: "error",
			};
		case "ACTIVE_GENRE_CHANGED":
			return {
				...state,
				activeGenre: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;

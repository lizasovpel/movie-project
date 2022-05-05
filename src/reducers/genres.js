const initialState = {
	genres: [],
	genresLoadingStatus: "idle",
	activeGenre: "all",
};

const genres = (state = initialState, action) => {
	switch (action.type) {
		case "GENRES_FETCHING":
			return {
				...state,
				genresLoadingStatus: "loading",
			};
		case "GENRES_FETCHED":
			return {
				...state,
				genres: action.payload,
				genresLoadingStatus: "idle",
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

export default genres;

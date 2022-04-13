const initialState = {
	movies: [],
	moviesLoadingStatus: "idle",
	page: 1,
	searchWord: null,
	movieSearchingStatus: "idle",
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
		case "SEARCH_WORD_CHANGE":
			return {
				...state,
				searchWord: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;

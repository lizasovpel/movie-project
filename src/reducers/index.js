const initialState = {
	movies: [],
	moviesLoadingStatus: "idle",
	page: 1,
	searchWord: null,
	movieSearchingStatus: "idle",
	movieID: null,
	movieLoadingStatus: "idle",
	movieInfo: null,
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
		case "ACTIVE_MOVIE_CHANGED":
			return {
				...state,
				movieID: action.payload,
			};
		case "MOVIE_FETCHING":
			return {
				...state,
				movieLoadingStatus: "loading",
			};
		case "MOVIE_FETCHED":
			return {
				...state,
				movieLoadingStatus: "idle",
				movieInfo: action.payload,
			};
		case "MOVIE_FETCHING_ERROR":
			return {
				...state,
				movieLoadingStatus: "error",
			};
		case "PAGE_CHANGE":
			return {
				...state,
				page: state.page + action.payload,
			};

		default:
			return state;
	}
};

export default reducer;

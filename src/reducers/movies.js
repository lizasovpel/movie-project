const initialState = {
	movies: [],
	moviesLoadingStatus: "idle",
	page: 1,
	totalPages: 1,
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
				totalPages: action.payload.total_pages,
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
		case "MOVIES_PAGE_CHANGE":
			return {
				...state,
				page: state.page + action.payload,
			};
		case "MAIN_PAGE":
			return {
				...state,
				moviesLoadingStatus: "loading",
				movies: [],
				page: 1,
			};

		default:
			return state;
	}
};

export default movies;

const initialState = {
	movieLoadingStatus: "idle",
	movieInfo: null,
	cast: [],
};

const movieInfo = (state = initialState, action) => {
	switch (action.type) {
		case "ACTIVE_MOVIE_CHANGED":
			return {
				...state,
				movieInfo: null,
				cast: [],
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
		case "CAST_FETCHED":
			return {
				...state,
				cast: action.payload,
			};

		default:
			return state;
	}
};

export default movieInfo;

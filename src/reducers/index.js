const initialState = {
	movies: [],
	moviesLoadingStatus: "idle",
	page: 1,
	searchWord: "",
	movieSearchingStatus: "idle",
	movieID: "",
	movieLoadingStatus: "idle",
	movieInfo: null,
	cast: [],
	genres: [],
	genresLoadingStatus: "idle",
	activeGenre: "all",
	reviewsLoadingStatus: "idle",
	reviewsPage: 1,
	reviews: [],
	totalReviewPages: null,
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
		case "SEARCH_WORD_NULL":
			return {
				...state,
				searchWord: "",
			};
		case "ACTIVE_MOVIE_CHANGED":
			return {
				...state,
				movieID: action.payload,
				reviews: [],
				searchWord: "",
				movieInfo: null,
				cast: [],
				genres: [],
				reviewsPage: 1,
				totalReviewPages: null,
				page: 1,
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
				page: 1,
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
		case "PAGE_CHANGE":
			return {
				...state,
				page: state.page + action.payload,
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
				genresLoadingStatus: "idle",
				page: 1,
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
		case "REVIEWS_FETCHING":
			return {
				...state,
				reviewsLoadingStatus: "loading",
			};
		case "REVIEWS_FETCHED":
			return {
				...state,
				reviewsLoadingStatus: "idle",
				reviews: state.reviews.concat(action.payload.results),
				totalReviewPages: action.payload.total_pages,
			};
		case "REVIEWS_FETCHING_ERROR":
			return {
				...state,
				reviewsLoadingStatus: "error",
			};
		case "REVIEWS_PAGE_CHANGE":
			return {
				...state,
				reviewsPage: state.reviewsPage + 1,
			};

		default:
			return state;
	}
};

export default reducer;

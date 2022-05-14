const initialState = {
	reviewsLoadingStatus: "idle",
	reviewsPage: 1,
	reviews: [],
	totalReviewPages: 1,
};

const reviews = (state = initialState, action) => {
	switch (action.type) {
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
		case "ACTIVE_MOVIE_CHANGED":
			return {
				reviewsLoadingStatus: "idle",
				reviewsPage: 1,
				reviews: [],
				totalReviewPages: 1,
			};

		default:
			return state;
	}
};

export default reviews;

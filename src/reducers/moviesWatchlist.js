const initialState = {
	moviesWatchlist: [],
	moviesWatchlistLoadingStatus: "idle",
	page: 1,
};

const moviesWatchlist = (state = initialState, action) => {
	switch (action.type) {
		case "MOVIES_WATCHLIST_FETCHING":
			return {
				...state,
				moviesWatchlistLoadingStatus: "loading",
			};
		case "MOVIES_WATCHLIST_FETCHED":
			return {
				...state,
				moviesWatchlist: action.payload,
				moviesWatchlistLoadingStatus: "idle",
			};
		case "MOVIES_WATCHLIST_TOTALPAGES_FETCHED":
			return {
				...state,
				totalPages: action.payload,
			};

		case "MOVIES_WATCHLIST_FETCHING_ERROR":
			return {
				...state,
				moviesWatchlistLoadingStatus: "error",
			};
		case "MOVIES_WATCHLIST_PAGE_ONE":
			return {
				...state,
				page: 1,
			};

		case "MOVIES_WATCHLIST_PAGE_CHANGE":
			return {
				...state,
				page: state.page + 1,
			};

		default:
			return state;
	}
};

export default moviesWatchlist;

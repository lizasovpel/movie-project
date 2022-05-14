const initialState = {
	favoriteList: [],
	favoriteListLoadingStatus: "idle",
	page: 1,
};

const favoriteList = (state = initialState, action) => {
	switch (action.type) {
		case "FAVORITE_LIST_FETCHING":
			return {
				...state,
				favoriteListLoadingStatus: "loading",
			};
		case "FAVORITE_LIST_FETCHED":
			return {
				...state,
				favoriteList: action.payload,
				favoriteListLoadingStatus: "idle",
			};
		case "FAVORITE_LIST_TOTALPAGES_FETCHED":
			return {
				...state,
				totalPages: action.payload,
			};

		case "FAVORITE_LIST_FETCHING_ERROR":
			return {
				...state,
				favoriteListLoadingStatus: "error",
			};
		case "FAVORITE_LIST_PAGE_ONE":
			return {
				...state,
				page: 1,
			};

		case "FAVORITE_LIST_PAGE_CHANGE":
			return {
				...state,
				page: state.page + 1,
			};

		default:
			return state;
	}
};

export default favoriteList;

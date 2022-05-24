const initialState = {
	username: undefined,
};

const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return {
				...state,
				username: action.payload[0],
				userID: action.payload[1],
			};
		case "USER_LOGGED_OUT":
			return {
				...state,
				username: undefined,
				userID: undefined,
				watchlist: [],
				favorite: [],
			};
		case "USER_WATCHLIST_LOADED":
			return {
				...state,
				watchlist: action.payload,
			};
		case "USER_FAVORITE_LOADED":
			return {
				...state,
				favorite: action.payload,
			};

		default:
			return state;
	}
};

export default userInfo;

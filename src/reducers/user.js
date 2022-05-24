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
			};

		default:
			return state;
	}
};

export default userInfo;

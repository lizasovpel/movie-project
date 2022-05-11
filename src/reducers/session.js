const initialState = {
	activeUser: "noUser",
};

const session = (state = initialState, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return {
				...state,
				activeUser: "User",
			};
		case "USER_LOGGED_OUT":
			return {
				...state,
				activeUser: "noUser",
			};
		default:
			return state;
	}
};

export default session;

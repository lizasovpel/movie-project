const initialState = {
	activeUser: false,
};

const session = (state = initialState, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return {
				...state,
				activeUser: "user",
			};
		case "USER_LOGGED_OUT":
			return {
				...state,
				activeUser: "none",
			};
		default:
			return state;
	}
};

export default session;

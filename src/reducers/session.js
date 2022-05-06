const initialState = {
	activeUser: false,
};

const session = (state = initialState, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return {
				...state,
				activeUser: true,
			};

		default:
			return state;
	}
};

export default session;

const initialState = {
	page: 1,
};

const pages = (state = initialState, action) => {
	switch (action.type) {
		case "PAGE_CHANGE":
			return {
				...state,
				page: state.page + action.payload,
			};
		case "ACTIVE_GENRE_CHANGED":
			return {
				...state,
				page: 1,
			};

		default:
			return state;
	}
};

export default pages;

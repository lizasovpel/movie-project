const initialState = {
	movieSearchingStatus: "idle",
};

const search = (state = initialState, action) => {
	switch (action.type) {
		case "SEARCH_WORD_CHANGE":
			return {
				...state,
				searchWord: action.payload,
			};
		// case "SEARCH_WORD_NULL":
		// 	return {
		// 		...state,
		// 		searchWord: "",
		// 	};
		case "MAIN_PAGE":
			return {
				...state,
				searchWord: "",
			};
		default:
			return state;
	}
};

export default search;

export const moviesFetching = () => {
	return {
		type: "MOVIES_FETCHING",
	};
};
export const moviesFetched = (movies) => {
	return {
		type: "MOVIES_FETCHED",
		payload: movies,
	};
};
export const moviesFetchingError = () => {
	return {
		type: "MOVIES_FETCHING_ERROR",
	};
};
export const activeMovieChanged = (id) => {
	return {
		type: "ACTIVE_MOVIE_CHANGED",
		payload: id,
	};
};
export const movieFetching = () => {
	return {
		type: "MOVIE_FETCHING",
	};
};
export const movieFetched = (data) => {
	return {
		type: "MOVIE_FETCHED",
		payload: data,
	};
};
export const movieFetchingError = () => {
	return {
		type: "MOVIE_FETCHING_ERROR",
	};
};
// export const movieFetching = () => {
// 	return {
// 		type: "MOVIE_FETCHING",
// 	};
// };

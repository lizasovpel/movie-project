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
export const genresFetching = () => {
	return {
		type: "GENRES_FETCHING",
	};
};
export const genresFetched = (genres) => {
	return {
		type: "GENRES_FETCHED",
		payload: genres,
	};
};
export const genresFetchingError = () => {
	return {
		type: "GENRES_FETCHING_ERROR",
	};
};
export const activeGenreChanged = (genre) => {
	return {
		type: "ACTIVE_GENRE_CHANGED",
		payload: genre,
	};
};

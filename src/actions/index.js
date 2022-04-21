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
export const pageChange = (number) => {
	return {
		type: "PAGE_CHANGE",
		payload: number,
	};
};
export const searchWordChange = (word) => {
	return {
		type: "SEARCH_WORD_CHANGE",
		payload: word,
	};
};
export const movieSearching = () => {
	return {
		type: "MOVIES_FETCHING",
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

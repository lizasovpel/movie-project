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
export const moviesPageChange = (number) => {
	return {
		type: "MOVIES_PAGE_CHANGE",
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
export const castFetched = (data) => {
	return {
		type: "CAST_FETCHED",
		payload: data.cast,
	};
};
export const reviewsFetching = () => {
	return {
		type: "REVIEWS_FETCHING",
	};
};
export const reviewsFetched = (data) => {
	return {
		type: "REVIEWS_FETCHED",
		payload: data,
	};
};
export const reviewsFetchingError = () => {
	return {
		type: "REVIEWS_FETCHING_ERROR",
	};
};
export const reviewsPageChange = () => {
	return {
		type: "REVIEWS_PAGE_CHANGE",
	};
};
export const moviesWatchlistFetching = () => {
	return {
		type: "MOVIES_WATCHLIST_FETCHING",
	};
};
export const moviesWatchlistFetched = (data) => {
	return {
		type: "MOVIES_WATCHLIST_FETCHED",
		payload: data,
	};
};
export const moviesWatchlistTotalpagesFetched = (data) => {
	return {
		type: "MOVIES_WATCHLIST_TOTALPAGES_FETCHED",
		payload: data,
	};
};

export const moviesWatchlistFetchingError = () => {
	return {
		type: "MOVIES_WATCHLIST_FETCHING_ERROR",
	};
};
export const moviesWatchlistPageChange = (number) => {
	return {
		type: "MOVIES_WATCHLIST_PAGE_CHANGE",
		payload: number,
	};
};
export const mainPage = () => {
	return {
		type: "MAIN_PAGE",
	};
};
export const userLoggedIn = () => {
	return {
		type: "USER_LOGGED_IN",
	};
};
export const userLoggedOut = () => {
	return {
		type: "USER_LOGGED_OUT",
	};
};

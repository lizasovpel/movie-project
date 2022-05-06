import { createStore, combineReducers } from "redux";
import genres from "../reducers/genres";
import movies from "../reducers/movies";
import movieInfo from "../reducers/movieInfo";
import reviews from "../reducers/reviews";
import search from "../reducers/search";
import moviesWatchlist from "../reducers/moviesWatchlist";
import session from "../reducers/session";
const store = createStore(
	combineReducers({ movies, genres, movieInfo, reviews, search, moviesWatchlist, session }),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

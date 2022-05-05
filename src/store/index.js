import { createStore, combineReducers } from "redux";
import genres from "../reducers/genres";
import movies from "../reducers/movies";
import pages from "../reducers/pages";
import movieInfo from "../reducers/movieInfo";
import reviews from "../reducers/reviews";
import search from "../reducers/search";
const store = createStore(
	combineReducers({ movies, genres, pages, movieInfo, reviews, search }),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

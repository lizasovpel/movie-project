import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MoviesPage, MoviePage, WatchlistPage, SignInPage, FavoritePage } from "../pages";
const App = () => {
	const { moviesLoadingStatus } = useSelector((state) => state.movies);
	const { moviesWatchlistLoadingStatus } = useSelector((state) => state.moviesWatchlist);
	const { favoriteListLoadingStatus } = useSelector((state) => state.favoriteList);
	const { genresLoadingStatus } = useSelector((state) => state.genres);
	const { movieLoadingStatus } = useSelector((state) => state.movieInfo);

	useEffect(() => {
		const loader = document.querySelector(".loading");
		if (
			moviesLoadingStatus === "loading" ||
			moviesWatchlistLoadingStatus === "loading" ||
			favoriteListLoadingStatus === "loading" ||
			genresLoadingStatus === "loading" ||
			movieLoadingStatus === "loading"
		) {
			loader.hidden = false;
		} else {
			loader.hidden = true;
		}
	}, [
		moviesLoadingStatus,
		moviesWatchlistLoadingStatus,
		favoriteListLoadingStatus,
		genresLoadingStatus,
		movieLoadingStatus,
	]);

	return (
		<Router>
			<AppHeader />
			<main>
				<Routes>
					<Route path="/" element={<MoviesPage />} />
					<Route path="/:id" element={<MoviePage />} />
					<Route path="/moviesWatchlist" element={<WatchlistPage />} />
					<Route path="/favorite" element={<FavoritePage />}></Route>
					<Route path="/signIn" element={<SignInPage />} />
				</Routes>
			</main>
		</Router>
	);
};

export default App;

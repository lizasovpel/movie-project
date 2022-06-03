import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MoviesPage, MoviePage, WatchlistPage, SignInPage, FavoritePage } from "../pages";
const App = () => {
	return (
		<div className="loader">
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
		</div>
	);
};

export default App;

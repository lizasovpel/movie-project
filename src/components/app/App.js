import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MoviesPage, MoviePage, WatchlistPage, SignInPage } from "../pages";
const App = () => {
	return (
		<Router>
			<AppHeader />
			<main>
				<Routes>
					<Route path="/" element={<MoviesPage />} />
					<Route path="/movieInfo" element={<MoviePage />} />
					<Route path="/moviesWatchlist" element={<WatchlistPage />} />
					<Route path="/signIn" element={<SignInPage />} />
				</Routes>
			</main>
		</Router>
	);
};

export default App;

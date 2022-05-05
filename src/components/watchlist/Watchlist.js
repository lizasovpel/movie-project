import "../movies/Movies.sass";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	activeMovieChanged,
	moviesWatchlistFetching,
	moviesWatchlistFetched,
	moviesWatchlistFetchingError,
	moviesWatchlistTotalpagesFetched,
} from "../../actions";
import { useHttpGet } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";

const Watchlist = () => {
	const { request } = useHttpGet();
	const dispatch = useDispatch();
	const { moviesWatchlist, moviesWatchlistLoadingStatus, page } = useSelector((state) => state.moviesWatchlist);

	useEffect(() => {
		dispatch(moviesWatchlistFetching());
		request(
			`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/watchlist/movies?${
				process.env.REACT_APP_KEY
			}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&page=${page}`
		)
			.then((res) => dispatch(moviesWatchlistTotalpagesFetched(res.total_pages)))
			.then((res) => dispatch(moviesWatchlistFetched(res.results)))
			.catch(() => dispatch(moviesWatchlistFetchingError()));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		dispatch(moviesWatchlistFetching());
		request(
			`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/watchlist/movies?${
				process.env.REACT_APP_KEY
			}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&page=${page}`
		)
			.then((res) => dispatch(moviesWatchlistFetched(res.results)))
			.catch(() => dispatch(moviesWatchlistFetchingError()));
		// eslint-disable-next-line
	}, [page]);

	if (moviesWatchlistLoadingStatus === "loading") {
		return <Spinner />;
	} else if (moviesWatchlistLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading Error</h5>;
	}

	const renderWatchlist = (watchlist) => {
		if (watchlist) {
			return watchlist.map(({ id, title, release_date, vote_average, poster_path }) => {
				return (
					<Link to="/movieInfo" key={id} onClick={() => dispatch(activeMovieChanged(id))}>
						<div className="movieCard">
							<div className="movieImage" data-proportion-h="2">
								<img
									src={
										poster_path
											? `https://image.tmdb.org/t/p/original${poster_path}`
											: "https://freepikpsd.com/file/2019/10/image-not-found-png-4-Transparent-Images.png"
									}
									alt="poster"
								/>
								<div className="rating">{vote_average}</div>
							</div>
							<h4>{title}</h4>
							<p>{release_date ? release_date.slice(0, 4) : null}</p>
						</div>
					</Link>
				);
			});
		}
	};
	const elements = renderWatchlist(moviesWatchlist);

	return (
		<div className="moviesContainer">
			<h2>Movies</h2>
			<div className="container">{elements}</div>
		</div>
	);
};

export default Watchlist;

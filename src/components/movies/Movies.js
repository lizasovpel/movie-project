import "./Movies.sass";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesFetched, moviesFetching, moviesPageOne } from "../../actions";
import { moviesFetchingError } from "../../actions";
import { activeMovieChanged } from "../../actions";
import Spinner from "../spinner/Spinner";
import { useHttpGet } from "../../hooks/http.hook";

const Movies = () => {
	const { searchWord } = useSelector((state) => state.search);
	const { page } = useSelector((state) => state.movies);

	const { movies, moviesLoadingStatus } = useSelector((state) => state.movies);
	const { activeGenre } = useSelector((state) => state.genres);

	const dispatch = useDispatch();
	const { request } = useHttpGet();

	useEffect(() => {
		localStorage.setItem(
			"users",
			JSON.stringify([
				{
					"login": "testuser070773",
					"password": "Test070773User",
				},
				{
					"login": "lizasovpel",
					"password": "7242550inebuN",
				},
			])
		);
		dispatch(moviesFetching());
		request(`https://api.themoviedb.org/3/movie/popular?${process.env.REACT_APP_KEY}&language=en-US&page=${page}`)
			.then((data) => dispatch(moviesFetched(data)))
			.catch(() => dispatch(moviesFetchingError()));
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (searchWord) {
			dispatch(moviesFetching());
			request(`https://api.themoviedb.org/3/search/movie?${process.env.REACT_APP_KEY}&query=${searchWord}`)
				.then((data) => dispatch(moviesFetched(data)))
				.catch(() => dispatch(moviesFetchingError()));
		} else {
			dispatch(moviesFetching());
			request(
				`https://api.themoviedb.org/3/movie/popular?${process.env.REACT_APP_KEY}&language=en-US&page=${page}`
			)
				.then((data) => dispatch(moviesFetched(data)))
				.catch(() => dispatch(moviesFetchingError()));
		}
	}, [searchWord]);

	useEffect(() => {
		if (page && page !== 1) {
			console.log(page);
			dispatch(moviesFetching());
			if (activeGenre === "all") {
				request(
					`https://api.themoviedb.org/3/movie/popular?${process.env.REACT_APP_KEY}&language=en-US&page=${page}`
				)
					.then((data) => dispatch(moviesFetched(data)))
					.catch(() => dispatch(moviesFetchingError()));
			} else {
				request(
					`https://api.themoviedb.org/3/discover/movie?${process.env.REACT_APP_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${activeGenre}`
				)
					.then((data) => dispatch(moviesFetched(data)))
					.catch(() => dispatch(moviesFetchingError()));
			}
		}
	}, [page]);

	useEffect(() => {
		if (activeGenre !== "all") {
			dispatch(moviesFetching());
			request(
				`https://api.themoviedb.org/3/discover/movie?${process.env.REACT_APP_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${activeGenre}`
			)
				.then((data) => dispatch(moviesFetched(data)))
				.catch(() => dispatch(moviesFetchingError()));
		} else {
			dispatch(moviesFetching());
			dispatch(moviesPageOne());
			request(
				`https://api.themoviedb.org/3/movie/popular?${process.env.REACT_APP_KEY}&language=en-US&page=${page}`
			)
				.then((data) => dispatch(moviesFetched(data)))
				.catch(() => dispatch(moviesFetchingError()));
		}
	}, [activeGenre]);

	if (moviesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (moviesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading Error</h5>;
	}
	const renderMoviesList = (movies) => {
		if (movies.length !== 0) {
			return movies.map(({ id, title, release_date, vote_average, poster_path }) => {
				return (
					<Link to="movieInfo" key={id} onClick={() => dispatch(activeMovieChanged(id))}>
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
		} else {
			return <div>No matches found</div>;
		}
	};

	const elements = renderMoviesList(movies);
	return (
		<div className="moviesContainer">
			<h2>Movies</h2>
			<div className="container">{elements}</div>
		</div>
	);
};

export default Movies;

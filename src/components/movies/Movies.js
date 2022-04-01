import "./Movies.sass";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesFetched, moviesFetching } from "../../actions";
import { moviesFetchingError } from "../../actions";
import Spinner from "../spinner/Spinner";
import { useHttp } from "../../hooks/http.hook";

const Movies = () => {
	const { movies, moviesLoadingStatus } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { request } = useHttp();
	const _apiBase = "https://api.themoviedb.org";
	const page = 1;

	useEffect(() => {
		dispatch(moviesFetching());
		request(`${_apiBase}/3/movie/popular?${process.env.REACT_APP_KEY}&language=en-US&page=${page}`)
			.then((data) => dispatch(moviesFetched(data)))
			.catch(() => dispatch(moviesFetchingError()));
		// eslint-disable-next-line
	}, []);

	if (moviesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (moviesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderMoviesList = (movies) => {
		return movies.map(({ id, title, release_date, vote_average, poster_path }) => {
			return (
				<Link to="movieInfo" key={id}>
					<div className="movieCard">
						<div className="movieImage">
							<img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="poster" />
							<div className="rating">{vote_average}</div>
						</div>
						<h4>{title}</h4>
						<p>{release_date.slice(0, 4)}</p>
					</div>
				</Link>
			);
		});
	};

	const elements = renderMoviesList(movies);
	return (
		<div className="moviesContainer">
			<h2>Movies</h2>
			<div className="container">{elements}</div>
			<button type="button" className="btn btn-danger">
				Load more
			</button>
		</div>
	);
};

export default Movies;

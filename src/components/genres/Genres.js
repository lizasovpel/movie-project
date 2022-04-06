import "./Genres.sass";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genresFetching, genresFetched, genresFetchingError, activeGenreChanged } from "../../actions";
import Spinner from "../spinner/Spinner";

const Genres = () => {
	const { genres, genresLoadingStatus, activeGenre } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(genresFetching());
		request(`https://api.themoviedb.org/3/genre/movie/list?${process.env.REACT_APP_KEY}&language=en-US`)
			.then((res) => res.genres)
			.then((genres) => dispatch(genresFetched(genres)))
			.catch(() => dispatch(genresFetchingError));
		// eslint-disable-next-line
	}, []);

	if (genresLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading Error</h5>;
	}

	const renderGenres = (genres) => {
		// if (genres.length === 0) {
		// 	return (
		// 		<h5 className="text-center" style={{ color: "white" }}>
		// 			Genres not found
		// 		</h5>
		// 	);
		// }

		return genres.map(({ id, name }) => {
			return (
				<button
					key={id}
					type="button"
					className="btn btn-outline-light"
					onClick={() => dispatch(activeGenreChanged(id))}
				>
					{name}
				</button>
			);
		});
	};

	const genresNames = renderGenres(genres);

	return (
		<div className="Container">
			<h2>Genres</h2>
			<div className="genres">{genresNames}</div>
		</div>
	);
};
export default Genres;

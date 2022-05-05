import "./Genres.sass";
import { useHttpGet } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genresFetching, genresFetched, genresFetchingError, activeGenreChanged } from "../../actions";
import Spinner from "../spinner/Spinner";

const Genres = () => {
	const { genres, genresLoadingStatus, activeGenre } = useSelector((state) => state.genres);
	const dispatch = useDispatch();
	const { request } = useHttpGet();

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
	const activeStyle = { "backgroundColor": "white", "color": "black" };

	const renderGenres = (genres) => {
		return genres.map(({ id, name }) => {
			return (
				<button
					key={id}
					id={name}
					type="button"
					className="btn btn-outline-light"
					style={activeGenre === id ? activeStyle : {}}
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

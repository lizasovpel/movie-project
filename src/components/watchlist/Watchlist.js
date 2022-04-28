import "../movies/Movies.sass";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { activeMovieChanged } from "../../actions";
import { useHttpGet } from "../../hooks/http.hook";

const Watchlist = () => {
	const { request } = useHttpGet();
	const dispatch = useDispatch();
	useEffect(() => {
		const elements = async () => {
			await request(
				`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/watchlist/movies?${
					process.env.REACT_APP_KEY
				}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&page=1`
			).then((res) => localStorage.setItem("watchlist", JSON.stringify(res.results)));
		};
		elements();
	}, []);
	const movies = JSON.parse(localStorage.getItem("watchlist"));
	const renderMovies = (movies) => {
		return movies.map(({ id, title, release_date, vote_average, poster_path }) => {
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
	};
	const elements = renderMovies(movies);

	return (
		<div className="moviesContainer">
			<h2>Movies</h2>
			<div className="container">{elements}</div>
		</div>
	);
};

export default Watchlist;

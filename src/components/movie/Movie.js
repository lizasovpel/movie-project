import "./Movie.sass";
import bg from "../../img/FCBG.webp";
import poster from "../../img/FCposter.jpeg";
import stars from "../../img/stars.png";
import Spinner from "../spinner/Spinner";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { movieFetching, movieFetched, movieFetchingError, castFetched } from "../../actions";

const Movie = () => {
	const { movieID, movieInfo, cast } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(movieFetching());
		request(
			`https://api.themoviedb.org/3/movie/${movieID}/credits?${process.env.REACT_APP_KEY}&language=en-US`
		).then((data) => dispatch(castFetched(data)));
		request(`https://api.themoviedb.org/3/movie/${movieID}?${process.env.REACT_APP_KEY}&language=en-US`)
			.then((data) => dispatch(movieFetched(data)))
			.catch(() => dispatch(movieFetchingError()));

		// eslint-disable-next-line
	}, [movieID]);

	if (movieInfo && cast) {
		const {
			original_title,
			backdrop_path,
			poster_path,
			overview,
			tagline,
			vote_average,
			production_countries,
			revenue,
			runtime,
			release_date,
			genres,
		} = movieInfo;
		const renderCast = (cast) => {
			const actorsList = cast.map(function (actor) {
				if (cast.length >= 4 && actor.order < 5) {
					return actor.name + ", ";
				} else if (actor.order === 5) {
					return actor.name;
				}
			});
			return actorsList;
		};
		const renderInfo = (allInfo) => {
			return allInfo.map((info) => (allInfo.indexOf(info) === allInfo.length - 1 ? info.name : info.name + ", "));
		};

		return (
			<div className="movieContainer">
				<img
					className="bg"
					src={backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : null}
					alt="bg"
				/>
				<div className="layer"></div>

				<div className="top">
					<div className="title">
						<h2>{original_title}</h2>
						<div className="vote">
							<p>{vote_average}</p>
							<img src={stars} alt="" />
						</div>
					</div>

					<div className="details">
						<div className="poster">
							<img
								src={
									poster_path
										? `https://image.tmdb.org/t/p/original${poster_path}`
										: "https://freepikpsd.com/file/2019/10/image-not-found-png-4-Transparent-Images.png"
								}
								alt=""
							/>
						</div>
						<div className="info">
							<h4>{tagline}</h4>
							<p>
								year: <b>{release_date.slice(0, 4)}</b>
							</p>
							<p>
								genre: <b>{renderInfo(genres)}</b>
							</p>
							<p>
								country: <b>{renderInfo(production_countries)}</b>
							</p>
							<p>
								revenue: <b>{revenue} $</b>
							</p>
							<p>
								runtime: <b>{runtime} m</b>
							</p>
							<p>
								cast members: <b>{renderCast(cast)}</b>
							</p>
						</div>
					</div>
					<div className="overview">
						<h3>Overview</h3>
						<p>{overview}</p>
					</div>
					<div className="reviews">
						<h3 style={{ paddingLeft: "20px" }}>Reviews</h3>
						<div className="review">
							<h5 className="name">onthestree</h5>
							<p className="text">
								Because you'll probably be confused the first time around. It's not a coincidence it
								stars some of the greatest actors of our time.
							</p>
							<p>11 February 2020</p>
						</div>
						<div className="review">
							<h5 className="name">onthestree</h5>
							<p className="text">
								Because you'll probably be confused the first time around. It's not a coincidence it
								stars some of the greatest actors of our time.
							</p>
							<p>11 February 2020</p>
						</div>
						<div className="review">
							<h5 className="name">onthestree</h5>
							<p className="text">
								Because you'll probably be confused the first time around. It's not a coincidence it
								stars some of the greatest actors of our time.
							</p>
							<p>11 February 2020</p>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <Spinner />;
	}
};
export default Movie;

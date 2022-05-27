import "./Movie.sass";
import stars from "../../img/stars.png";
import heart from "../../img/heart.png";
import heart2 from "../../img/heart2.png";
import watchlist1 from "../../img/watchlist1.png";
import watchlist2 from "../../img/watchlist2.png";
import notFound from "../../img/notFound.png";

import Spinner from "../spinner/Spinner";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHttpGet, useHttpsPost } from "../../hooks/http.hook";
import { movieFetching, movieFetched, castFetched, searchWordChange, userWatchlist, userFavorite } from "../../actions";

const Movie = () => {
	const { movieInfo, cast, movieLoadingStatus } = useSelector((state) => state.movieInfo);
	const dispatch = useDispatch();
	const { request } = useHttpGet();
	const { postRequest } = useHttpsPost();
	const movieID = +useParams().id;
	const { username, watchlist, favorite } = useSelector((state) => state.userInfo);

	useEffect(() => {
		dispatch(searchWordChange(""));
		dispatch(movieFetching());
		request(
			`https://api.themoviedb.org/3/movie/${movieID}/credits?${process.env.REACT_APP_KEY}&language=en-US`
		).then((data) => dispatch(castFetched(data)));
		request(`https://api.themoviedb.org/3/movie/${movieID}?${process.env.REACT_APP_KEY}&language=en-US`).then(
			(data) => dispatch(movieFetched(data))
		);
		// eslint-disable-next-line
	}, []);
	let isInFavorite;
	let isInWatchlist;
	if (username && favorite && watchlist) {
		isInFavorite = favorite.indexOf(movieID);
		isInWatchlist = watchlist.indexOf(movieID);
	}

	if (movieLoadingStatus === "loading") {
		return <Spinner />;
	} else if (movieLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading Error</h5>;
	}

	if (movieInfo && cast) {
		const {
			title,
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
			budget,
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

		const removeFrom = async (list) => {
			await postRequest(
				`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/${list}?${
					process.env.REACT_APP_KEY
				}&session_id=${localStorage.getItem("session_id")}`,
				{
					"media_type": "movie",
					"media_id": movieID,
					[list]: false,
				}
			);
			if (list === "watchlist") {
				const index = watchlist.indexOf(movieID);
				watchlist.splice(index, 1);
				dispatch(userWatchlist(watchlist));
			}
			if (list === "favorite") {
				const index = favorite.indexOf(movieID);
				favorite.splice(index, 1);
				dispatch(userFavorite(favorite));
			}
		};

		const addTo = async (list) => {
			await postRequest(
				`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/${list}?${
					process.env.REACT_APP_KEY
				}&session_id=${localStorage.getItem("session_id")}`,
				{
					"media_type": "movie",
					"media_id": movieID,
					[list]: true,
				}
			);
			if (list === "watchlist") {
				const newList = [movieID].concat(watchlist);
				dispatch(userWatchlist(newList));
			}
			if (list === "favorite") {
				const newList = [movieID].concat(favorite);
				dispatch(userFavorite(newList));
			}
		};
		const changeDisplay = (list) => {
			let item1 = document.querySelector(`#${list}1`);
			let item2 = document.querySelector(`#${list}2`);
			item1.style.display === "block" ? (item1.style.display = "none") : (item1.style.display = "block");
			item2.style.display === "block" ? (item2.style.display = "none") : (item2.style.display = "block");
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
						<h2>{title}</h2>
						<div className="options">
							<div className="rate">
								<p>{vote_average}</p>
								<div id="rate" type="button">
									<img src={stars} alt="star" />
								</div>
							</div>
							<div className="actions" style={{ "display": username ? "flex" : "none" }}>
								<div
									id="favorite1"
									type="button"
									style={{ "display": isInFavorite < 0 ? "block" : "none" }}
									onClick={() => {
										addTo("favorite");
										changeDisplay("favorite");
									}}
								>
									<img src={heart} alt="favorite" />
								</div>
								<div
									id="favorite2"
									type="button"
									style={{ "display": isInFavorite < 0 ? "none" : "block" }}
									onClick={() => {
										removeFrom("favorite");
										changeDisplay("favorite");
									}}
								>
									<img src={heart2} alt="favorite" />
								</div>
								<div
									id="watchlist1"
									type="button"
									style={{ "display": isInWatchlist < 0 ? "block" : "none" }}
									onClick={() => {
										addTo("watchlist");
										changeDisplay("watchlist");
									}}
								>
									<img src={watchlist1} alt="watchlist" />
								</div>
								<div
									id="watchlist2"
									type="button"
									style={{ "display": isInWatchlist < 0 ? "none" : "block" }}
									onClick={() => {
										removeFrom("watchlist");
										changeDisplay("watchlist");
									}}
								>
									<img src={watchlist2} alt="watchlist" />
								</div>
							</div>
						</div>
					</div>

					<div className="details">
						<div className="poster">
							<img
								src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : notFound}
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
								budget: <b>{budget} $</b>
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
				</div>
			</div>
		);
	} else {
		return <Spinner />;
	}
};
export default Movie;

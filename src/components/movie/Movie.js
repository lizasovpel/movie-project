import "./Movie.sass";
import stars from "../../img/stars.png";
import heart from "../../img/heart.png";
import heart2 from "../../img/heart2.png";
import watchlist from "../../img/watchlist.png";
import Spinner from "../spinner/Spinner";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttpGet, useHttpsPost } from "../../hooks/http.hook";
import { movieFetching, movieFetched, movieFetchingError, castFetched } from "../../actions";

const Movie = () => {
	const { movieID, movieInfo, cast, movieLoadingStatus } = useSelector((state) => state.movieInfo);
	const dispatch = useDispatch();
	const { request } = useHttpGet();
	const { postRequest } = useHttpsPost();
	const username = localStorage.getItem("username");

	useEffect(() => {
		dispatch(movieFetching());
		(async function getCast() {
			let data = await request(
				`https://api.themoviedb.org/3/movie/${movieID}/credits?${process.env.REACT_APP_KEY}&language=en-US`
			);
			dispatch(castFetched(data));
		})();
		(async function getMovieInfo() {
			let data = await request(
				`https://api.themoviedb.org/3/movie/${movieID}?${process.env.REACT_APP_KEY}&language=en-US`
			);
			dispatch(movieFetched(data));

			if (username) {
				async function getFav() {
					let page = 1;
					let total_pages;
					let data = await request(
						`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/favorite/movies?${
							process.env.REACT_APP_KEY
						}&session_id=${localStorage.getItem(
							"session_id"
						)}&language=en-US&sort_by=created_at.asc&page=${page}`
					);
					let IDs = data.results.map((movie) => movie.id);
					total_pages = data.total_pages;

					while (page < total_pages) {
						let res = await request(
							`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/favorite/movies?${
								process.env.REACT_APP_KEY
							}&session_id=${localStorage.getItem(
								"session_id"
							)}&language=en-US&sort_by=created_at.asc&page=${page + 1}`
						);
						let newIDs = res.results.map((movie) => movie.id);
						IDs.push(...newIDs);

						page++;
						return IDs;
					}
				}
				let IDs = await getFav();
				let isFavorite = IDs.indexOf(movieID);
				localStorage.setItem("isFavorite", isFavorite);
			}
		})();
		// eslint-disable-next-line
	}, []);

	if (movieLoadingStatus === "loading") {
		return <Spinner />;
	} else if (movieLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading Error</h5>;
	}

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

		const getFavList = async () => {
			let page = 1;
			let IDs = await request(
				`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/favorite/movies?${
					process.env.REACT_APP_KEY
				}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&page=${page}`
			);
			const total_pages = IDs.total_pages;
			IDs = IDs.results.map((movie) => movie.id);
			while (page < total_pages) {
				let res = await request(
					`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/favorite/movies?${
						process.env.REACT_APP_KEY
					}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&page=${
						page + 1
					}`
				);
				res = res.results.map((movie) => movie.id);
				IDs.push(...res);
				console.log(IDs);
				page++;
			}
			const isFavorite = IDs.indexOf(movieID);
			localStorage.setItem("isFavorite", isFavorite);
		};

		if (username) {
			getFavList();
		}

		const addToFav = async () => {
			await postRequest(
				`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/favorite?${
					process.env.REACT_APP_KEY
				}&session_id=${localStorage.getItem("session_id")}`,
				{
					"media_type": "movie",
					"media_id": movieID,
					"favorite": true,
				}
			).then((res) => console.log(res));
		};

		const removeFromFav = async () => {
			await postRequest(
				`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/favorite?${
					process.env.REACT_APP_KEY
				}&session_id=${localStorage.getItem("session_id")}`,
				{
					"media_type": "movie",
					"media_id": movieID,
					"favorite": false,
				}
			).then((res) => console.log(res));
		};

		let isFavorite = localStorage.getItem("isFavorite");
		let heartDisplay;
		let heart2Display;
		if (isFavorite < 0) {
			heartDisplay = "block";
			heart2Display = "none";
		} else {
			heartDisplay = "none";
			heart2Display = "block";
		}

		const changeDisplay = () => {
			let heart1 = document.querySelector("#favorite1");
			let heart2 = document.querySelector("#favorite2");
			heart1.style.display === "block" ? (heart1.style.display = "none") : (heart1.style.display = "block");
			heart2.style.display === "block" ? (heart2.style.display = "none") : (heart2.style.display = "block");
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
						<div className="options">
							<div className="rate">
								<p>{vote_average}</p>
								<div id="rate" type="button">
									<img src={stars} alt="star" />
								</div>
							</div>
							<div className="actions" style={{ "display": username === "noUser" ? "none" : "flex" }}>
								<div
									id="favorite1"
									type="button"
									style={{ "display": heartDisplay }}
									onClick={() => {
										addToFav();
										changeDisplay();
									}}
								>
									<img src={heart} alt="favorite" />
								</div>
								<div
									id="favorite2"
									type="button"
									style={{ "display": heart2Display }}
									onClick={() => {
										removeFromFav();
										changeDisplay();
									}}
								>
									<img src={heart2} alt="favorite" />
								</div>
								<div id="watchlist" type="button">
									<img src={watchlist} alt="watchlist" />
								</div>
							</div>
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

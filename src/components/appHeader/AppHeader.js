import "./AppHeader.sass";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHttpGet } from "../../hooks/http.hook";
import { userLoggedIn, userFavorite, userWatchlist } from "../../actions";

import {
	searchWordChange,
	movieSearching,
	mainPage,
	moviesWatchlistPageOne,
	favoriteListPageOne,
	moviesPageOne,
	activeGenreChanged,
	userLoggedOut,
} from "../../actions";
import search from "../../img/search.png";
import { useNavigate } from "react-router-dom";
import debounce from "debounce";

const AppHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { request } = useHttpGet();

	const Menu = document.querySelector("#menu");
	const { username } = useSelector((state) => state.userInfo);
	const activeUser = async () => {
		await request(
			`https://api.themoviedb.org/3/account?${process.env.REACT_APP_KEY}&session_id=${localStorage.getItem(
				"session_id"
			)}`
		)
			.then((res) => {
				dispatch(userLoggedIn(res.username, res.id));
			})
			.catch((error) => console.log(error));
	};
	const session_id = localStorage.getItem("session_id");
	async function getListOf(list) {
		let page = 1;
		let IDs = await request(
			`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/${list}/movies?${
				process.env.REACT_APP_KEY
			}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&page=${page}`
		);
		const total_pages = IDs.total_pages;
		IDs = IDs.results.map((movie) => movie.id);
		while (page < total_pages) {
			let res = await request(
				`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/${list}/movies?${
					process.env.REACT_APP_KEY
				}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&page=${
					page + 1
				}`
			);
			res = res.results.map((movie) => movie.id);
			IDs.push(...res);
			page++;
		}
		if (list === "watchlist") {
			dispatch(userWatchlist(IDs));
		}
		if (list === "favorite") {
			dispatch(userFavorite(IDs));
		}
	}
	useEffect(() => {
		if (session_id) {
			activeUser();
			getListOf("watchlist");
			getListOf("favorite");
		}
	}, []);

	let accountButtonDisplay;
	let SignInButtonDisplay;
	if (!session_id) {
		accountButtonDisplay = "none";
		SignInButtonDisplay = "block";
	} else {
		accountButtonDisplay = "table-cell";
		SignInButtonDisplay = "none";
	}

	const showMenu = () => {
		Menu.hidden ? (Menu.hidden = false) : (Menu.hidden = true);
	};
	const hideMenu = () => {
		Menu.hidden = true;
	};
	const signOut = () => {
		dispatch(userLoggedOut());
		localStorage.removeItem("token");
		localStorage.removeItem("session_id");
	};

	const { searchWord } = useSelector((state) => state);
	function debFunc(e) {
		navigate("/");
		dispatch(activeGenreChanged("all"));
		dispatch(moviesPageOne());
		dispatch(searchWordChange(e.target.value));
	}
	return (
		<header>
			<Link to="/" onClick={() => dispatch(mainPage())}>
				<h1>MOVIES</h1>
			</Link>
			<div className="right">
				<div className="container-fluid">
					<form className="d-flex">
						<div className="input-group">
							<input
								type="search"
								className="form-control"
								placeholder="search..."
								value={searchWord}
								onChange={debounce(debFunc, 500)}
							/>
							<button className="input-group-text" onClick={() => dispatch(movieSearching())}>
								<img src={search} alt="search" />
							</button>
						</div>
					</form>
				</div>
				<div className="loginBtn" id="btn">
					<Link to="signin" style={{ "display": SignInButtonDisplay }}>
						<button id="SignIn" type="button" className="btn">
							Sign in
						</button>
					</Link>
					<div id="Account" type="button" onClick={showMenu} style={{ "display": accountButtonDisplay }}>
						<span id="userLogo">{username ? username.slice(0, 1).toUpperCase() : null}</span>
					</div>
				</div>
			</div>
			<ul id="menu" hidden onClick={(e) => hideMenu(e)}>
				<Link to="/moviesWatchlist" onClick={() => dispatch(moviesWatchlistPageOne())}>
					<li>Watchlist</li>
				</Link>
				<Link to="/favorite" onClick={() => dispatch(favoriteListPageOne())}>
					<li>Favorite movies</li>
				</Link>
				<Link to="/">
					<li onClick={signOut}>Sign out</li>
				</Link>
			</ul>
		</header>
	);
};

export default AppHeader;

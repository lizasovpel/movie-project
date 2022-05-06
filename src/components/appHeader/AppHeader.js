import "./AppHeader.sass";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchWordChange, movieSearching, mainPage } from "../../actions";
import search from "../../img/search.png";
import { useHttpGet, useHttpsPost } from "../../hooks/http.hook";

const AppHeader = () => {
	const { request } = useHttpGet();
	const { postRequest } = useHttpsPost();
	const SignInButton = document.querySelector("#SignIn");
	const StartButton = document.querySelector("#Start");
	const AccountButton = document.querySelector("#Account");
	const Menu = document.querySelector("#menu");
	const userLogo = document.querySelector("#userLogo");

	const signIn = async () => {
		SignInButton.hidden = true;
		StartButton.hidden = false;
		await request(`https://api.themoviedb.org/3/authentication/token/new?${process.env.REACT_APP_KEY}`).then(
			(data) => localStorage.setItem("token", data.request_token)
		);
		window.open(`https://www.themoviedb.org/authenticate/${localStorage.getItem("token")}`);
	};

	const start = async () => {
		await postRequest(`https://api.themoviedb.org/3/authentication/session/new?${process.env.REACT_APP_KEY}`, {
			"request_token": localStorage.getItem("token"),
		}).then((res) => localStorage.setItem("session_id", res.data.session_id));
		await request(
			`https://api.themoviedb.org/3/account?${process.env.REACT_APP_KEY}&session_id=${localStorage.getItem(
				"session_id"
			)}`
		).then((res) => {
			localStorage.setItem("username", res.username);
			userLogo.innerHTML = localStorage.getItem("username").slice(0, 1).toUpperCase();
			localStorage.setItem("id", res.id);
		});
		if (localStorage.getItem("username")) {
			StartButton.hidden = true;
			AccountButton.hidden = false;
		}
	};

	const signOut = () => {
		localStorage.setItem("session_id", null);
		localStorage.setItem("username", null);
		localStorage.setItem("id", null);
		localStorage.setItem("token", null);
		localStorage.setItem("watchlist", null);
		SignInButton.hidden = false;
		AccountButton.hidden = true;
	};

	const showMenu = () => {
		Menu.hidden = false;
		if (!localStorage.getItem("session_id")) {
			start();
		}
	};
	const hideMenu = (e) => {
		Menu.hidden = true;
	};

	const { searchWord } = useSelector((state) => state);
	const dispatch = useDispatch();
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
								onChange={(e) => dispatch(searchWordChange(e.target.value))}
							/>
							<button className="input-group-text" onClick={() => dispatch(movieSearching())}>
								<img src={search} alt="search" />
							</button>
						</div>
					</form>
				</div>
				<div className="loginBtn" id="btn">
					<Link to="signin">
						<button id="SignIn" type="button" className="btn" /* onClick={signIn} */>
							Sign in
						</button>
					</Link>
					<button id="Start" type="button" className="btn" hidden onClick={start}>
						Start
					</button>
					<div id="Account" type="button" hidden onClick={showMenu}>
						<span id="userLogo"></span>
					</div>
				</div>
			</div>
			<ul id="menu" hidden onClick={(e) => hideMenu(e)}>
				<Link to="/moviesWatchlist">
					<li>Watchlist</li>
				</Link>
				<Link to="/">
					<li>Favorite movies</li>
				</Link>
				<Link to="/">
					<li>Favorite TV Shows</li>
				</Link>
				<Link to="/">
					<li onClick={signOut}>Sign out</li>
				</Link>
			</ul>
		</header>
	);
};

export default AppHeader;

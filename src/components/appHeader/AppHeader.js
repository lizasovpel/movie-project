import "./AppHeader.sass";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchWordChange, movieSearching, mainPage, userLoggedOut } from "../../actions";
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
	const activeUser = useSelector((state) => state.session.activeUser);
	const signInDisplay = activeUser === "noUser" ? ["block", "none"] : ["none", "table-cell"];

	const signOut = () => {
		localStorage.setItem("session_id", "null");
		localStorage.setItem("username", "");
		localStorage.setItem("id", null);
		localStorage.setItem("token", null);
		dispatch(userLoggedOut());
	};

	const showMenu = () => {
		Menu.hidden ? (Menu.hidden = false) : (Menu.hidden = true);
	};
	const hideMenu = () => {
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
						<button id="SignIn" type="button" className="btn" style={{ "display": signInDisplay[0] }}>
							Sign in
						</button>
					</Link>
					<div
						id="Account"
						type="button"
						onClick={showMenu}
						style={{ "display": signInDisplay[1] }}
						// style={{ "display": [activeUser] !== "none" ? "block" : "none" }}
					>
						<span id="userLogo">
							{localStorage.getItem("username")
								? localStorage.getItem("username").slice(0, 1).toUpperCase()
								: null}
						</span>
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

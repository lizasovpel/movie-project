import "./AppHeader.sass";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchWordChange, movieSearching, mainPage, moviesWatchlistPageOne, favoriteListPageOne } from "../../actions";
import search from "../../img/search.png";
import { useNavigate } from "react-router-dom";
import debounce from "debounce";

const AppHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const Menu = document.querySelector("#menu");
	const username = localStorage.getItem("username");
	let accountButtonDisplay;
	let SignInButtonDisplay;
	if (username === "noUser" || !username) {
		accountButtonDisplay = "none";
		SignInButtonDisplay = "block";
	} else {
		accountButtonDisplay = "table-cell";
		SignInButtonDisplay = "none";
	}

	const signOut = () => {
		localStorage.removeItem("session_id");
		localStorage.setItem("username", "noUser");
		localStorage.removeItem("password");
		localStorage.removeItem("id");
		localStorage.removeItem("token");
		navigate("/");
	};

	const showMenu = () => {
		Menu.hidden ? (Menu.hidden = false) : (Menu.hidden = true);
	};
	const hideMenu = () => {
		Menu.hidden = true;
	};

	const { searchWord } = useSelector((state) => state);
	function func(e) {
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
								onChange={debounce(func, 1000)}
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
						<span id="userLogo">
							{localStorage.getItem("username")
								? localStorage.getItem("username").slice(0, 1).toUpperCase()
								: null}
						</span>
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

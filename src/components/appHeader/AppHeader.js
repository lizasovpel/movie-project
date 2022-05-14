import "./AppHeader.sass";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchWordChange, movieSearching, mainPage } from "../../actions";
import search from "../../img/search.png";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const SignInButton = document.querySelector("#SignIn");
	const AccountButton = document.querySelector("#Account");
	const Menu = document.querySelector("#menu");
	const username = localStorage.getItem("username");
	let accountButtonDisplay;
	let SignInButtonDisplay;
	// SignInButton.hidden = false;
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
				<Link to="/moviesWatchlist">
					<li>Watchlist</li>
				</Link>
				<Link to="/">
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

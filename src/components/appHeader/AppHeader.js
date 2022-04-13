import "./AppHeader.sass";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchWordChange, movieSearching } from "../../actions";
import search from "../../img/search.png";
const AppHeader = () => {
	const { searchWord } = useSelector((state) => state);
	const dispatch = useDispatch();
	return (
		<header>
			<Link to="/">
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
				<div className="loginBtn">
					<Link to="/signIn">
						<button type="button" className="btn">
							Sign in
						</button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;

import "./SignIn.sass";
// import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttpGet, useHttpsPost } from "../../hooks/http.hook";
import { loginChange, passwordChange, tokenFetched } from "../../actions";

const SignIn = () => {
	const { login, password, token } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { request } = useHttpGet();
	const { postRequest } = useHttpsPost();
	const axios = require("axios");

	const onLogin = (e) => {
		e.preventDefault();
		request(`https://api.themoviedb.org/3/authentication/token/new?${process.env.REACT_APP_KEY}`)
			.then((data) => console.log(data))
			.then((data) => dispatch(tokenFetched(data)));
		// .then(window.open(`https://www.themoviedb.org/authenticate/${token}`));
	};

	return (
		<div className="loginPage">
			<div className="Container">
				<h2>Sign in</h2>
				<form onSubmit={onLogin}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Login
						</label>
						<input
							className="form-control"
							aria-describedby="emailHelp"
							onChange={(e) => dispatch(loginChange(e.target.value))}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							onChange={(e) => dispatch(passwordChange(e.target.value))}
						/>
						{/* <div id="loginHelp" className="form-text">error message</div> */}
					</div>
					<button type="submit" className="btn">
						Sign in
					</button>
					{/* <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p> */}
				</form>
			</div>
		</div>
	);
};

export default SignIn;

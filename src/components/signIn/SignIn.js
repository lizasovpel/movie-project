import "./SignIn.sass";
import { useHttpGet, useHttpsPost } from "../../hooks/http.hook";

const SignIn = () => {
	const { request } = useHttpGet();
	const { postRequest } = useHttpsPost();
	const axios = require("axios");

	const onLogin = async (e) => {
		e.preventDefault();
		const loginInput = e.target.querySelector("#loginInput");
		const login = loginInput.value;
		const passwordInput = e.target.querySelector("#passwordInput");
		const password = passwordInput.value;
		const token = await request(
			`https://api.themoviedb.org/3/authentication/token/new?${process.env.REACT_APP_KEY}`
		).then((data) => {
			return data.request_token;
		});
		window.open(`https://www.themoviedb.org/authenticate/${token}`);
		postRequest(`https://api.themoviedb.org/3/authentication/session/new?${process.env.REACT_APP_KEY}`, {
			"request_token": token,
		});
	};

	return (
		<div className="loginPage">
			<div className="Container">
				<h2>Sign in</h2>
				<form onSubmit={onLogin}>
					<div className="mb-3">
						<label htmlFor="loginInput" className="form-label">
							Login
						</label>
						<input
							id="loginInput"
							className="form-control"
							aria-describedby="emailHelp"
							value="lizasovpel"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="passwordInput" className="form-label">
							Password
						</label>
						<input id="passwordInput" type="password" className="form-control" value="7242550inebun" />
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

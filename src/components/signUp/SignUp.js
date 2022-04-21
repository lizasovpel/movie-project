import "../signIn/SignIn.sass";

import { Link } from "react-router-dom";

const SignUp = () => {
	return (
		<div className="loginPage">
			<div className="Container">
				<h2>Sign up</h2>
				<form>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>
						<input type="password" className="form-control" id="exampleInputPassword1" />
						{/* <div id="loginHelp" className="form-text">error message</div> */}
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword2" className="form-label">
							Repeat your password
						</label>
						<input type="password" className="form-control" id="exampleInputPassword2" />
						{/* <div id="loginHelp" className="form-text">error message</div> */}
					</div>
					<button type="submit" className="btn">
						Sign up
					</button>
					<p>
						Already have an account? <Link to="/signin">Sign in</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;

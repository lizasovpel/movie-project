import "./SignIn.sass";
import { useHttpGet, useHttpsPost } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeGenreChanged, userLoggedIn, userWatchlist, userFavorite, searchWordChange } from "../../actions";

const SignIn = () => {
	const { request } = useHttpGet();
	const { postRequest } = useHttpsPost();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(searchWordChange(""));
	}, []);

	const onLogin = async (e) => {
		e.preventDefault();
		const loginInput = e.target.querySelector("#loginInput");
		const loginValue = loginInput.value;
		const passwordInput = e.target.querySelector("#passwordInput");
		const passwordValue = passwordInput.value;
		const users = JSON.parse(localStorage.getItem("users"));
		const loginHelp = document.querySelector("#loginHelp");
		const passwordHelp = document.querySelector("#passwordHelp");
		const wrongPassword = document.querySelector("#wrongPassword");

		if (loginValue && passwordValue) {
			loginHelp.hidden = true;
			passwordHelp.hidden = true;
			wrongPassword.hidden = true;
			const accountExists = users.find((user) => user.login === loginValue);
			if (!accountExists || passwordValue !== accountExists.password) {
				wrongPassword.hidden = false;
			} else {
				await request(
					`https://api.themoviedb.org/3/authentication/token/new?${process.env.REACT_APP_KEY}`
				).then((data) => localStorage.setItem("token", data.request_token));
				window.open(`https://www.themoviedb.org/authenticate/${localStorage.getItem("token")}`);
				const postfunc = async () => {
					clearTimeout(postfunc);
					await postRequest(
						`https://api.themoviedb.org/3/authentication/session/new?${process.env.REACT_APP_KEY}`,
						{
							"request_token": localStorage.getItem("token"),
						}
					)
						.then((res) => {
							localStorage.setItem("session_id", res.data.session_id);
						})
						.catch((error) => setTimeout(postfunc, 5000));
					await request(
						`https://api.themoviedb.org/3/account?${
							process.env.REACT_APP_KEY
						}&session_id=${localStorage.getItem("session_id")}`
					)
						.then((res) => {
							dispatch(userLoggedIn(res.username, res.id));
							dispatch(activeGenreChanged("all"));
						})
						.catch((error) => console.log(error));
					navigate("/");
					async function getListOf(list) {
						let page = 1;
						let IDs = await request(
							`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/${list}/movies?${
								process.env.REACT_APP_KEY
							}&session_id=${localStorage.getItem(
								"session_id"
							)}&language=en-US&sort_by=created_at.asc&page=${page}`
						);
						const total_pages = IDs.total_pages;
						IDs = IDs.results.map((movie) => movie.id);
						while (page < total_pages) {
							let res = await request(
								`https://api.themoviedb.org/3/account/${localStorage.getItem("id")}/${list}/movies?${
									process.env.REACT_APP_KEY
								}&session_id=${localStorage.getItem(
									"session_id"
								)}&language=en-US&sort_by=created_at.asc&page=${page + 1}`
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
					getListOf("watchlist");
					getListOf("favorite");
				};
				setTimeout(postfunc, 1000);
			}
		} else {
			loginValue ? (loginHelp.hidden = true) : (loginHelp.hidden = false);
			passwordValue ? (passwordHelp.hidden = true) : (passwordHelp.hidden = false);
		}
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
						<input id="loginInput" className="form-control" aria-describedby="emailHelp" />
						<div id="loginHelp" className="form-text" hidden>
							enter login
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="passwordInput" className="form-label">
							Password
						</label>
						<input id="passwordInput" type="password" className="form-control" />
						<div id="passwordHelp" className="form-text" hidden>
							enter password
						</div>
						<div id="wrongPassword" className="form-text" hidden>
							wrong login or password
						</div>
					</div>
					<button type="submit" className="btn">
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignIn;

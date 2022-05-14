import "./Pagination.sass";
import { useDispatch, useSelector } from "react-redux";
import { moviesPageChange, moviesWatchlistPageChange, reviewsPageChange } from "../../actions";
const Pagination = () => {
	let storeName;
	let actionType;
	let key;
	switch (document.location.pathname) {
		case "/":
			storeName = "movies";
			key = "movies";
			actionType = moviesPageChange;
			break;
		case "/moviesWatchlist":
			storeName = "moviesWatchlist";
			key = "moviesWatchlist";
			actionType = moviesWatchlistPageChange;
			break;
		default:
			storeName = "/movies";
	}
	const { page, totalPages } = useSelector((state) => state[storeName]);
	const list = useSelector((state) => state[storeName][key]);

	const dispatch = useDispatch();

	const display = page === totalPages ? "none" : "flex";
	const action = (a, b) => {
		return dispatch(a(b));
	};

	if (list && list.length !== 0) {
		return (
			<div className="button" style={{ "display": display }}>
				<button type="button" className="btn btn-outline-danger" onClick={() => action(actionType, 1)}>
					next page
				</button>
			</div>
		);
	} else {
		return <></>;
	}
};

export default Pagination;

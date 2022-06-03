import "./Pagination.sass";
import { useDispatch, useSelector } from "react-redux";
import { moviesPageChange, moviesWatchlistPageChange, favoriteListPageChange } from "../../actions";
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
		case "/favorite":
			storeName = "favoriteList";
			key = "favoriteList";
			actionType = favoriteListPageChange;
			break;
		default:
			storeName = "/movies";
	}
	const { page, totalPages } = useSelector((state) => state[storeName]);
	const list = useSelector((state) => state[storeName][key]);

	const dispatch = useDispatch();

	// const display = page === totalPages ? "none" : "flex";
	const action = (a, b) => {
		return dispatch(a(b));
	};

	if (list && list.length !== 0) {
		return (
			<nav className="pagination" aria-label="Page navigation">
				<ul className="pagination">
					<li
						className={page === 1 ? "page-item disabled" : "page-item"}
						id="prev"
						onClick={() => action(actionType, -1)}
					>
						<a className="page-link" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<li className="page-item disabled">
						<a className="page-link" href="#">
							{page}
						</a>
					</li>
					<li
						className={page === totalPages ? "page-item disabled" : "page-item"}
						id="next"
						onClick={() => action(actionType, 1)}
					>
						<a className="page-link" href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>

			// <div className="button" style={{ "display": display }}>
			// 	<button type="button" className="btn btn-outline-danger" onClick={() => action(actionType, 1)}>
			// 		next page
			// 	</button>
			// </div>
		);
	} else {
		return <></>;
	}
};

export default Pagination;

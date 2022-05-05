import "./Pagination.sass";
import { useDispatch, useSelector } from "react-redux";
import { moviesPageChange, moviesWatchlistPageChange, reviewsPageChange } from "../../actions";
const Pagination = () => {
	const { movies } = useSelector((state) => state.movies);
	let storeName;
	let actionType;
	switch (document.location.pathname) {
		case "/":
			storeName = "movies";
			actionType = moviesPageChange;
			break;
		case "/moviesWatchlist":
			storeName = "moviesWatchlist";
			actionType = moviesWatchlistPageChange;
			break;
		case "/movieInfo":
			storeName = "reviews";
			actionType = reviewsPageChange;
			break;
		default:
			storeName = "/movies";
	}
	const { page } = useSelector((state) => state[storeName]);

	const dispatch = useDispatch();

	const disabled = page === 1 ? "page-item disabled" : "page-item";
	if (movies.length === 0) {
		return <></>;
	}
	const action = (a, b) => {
		return dispatch(a(b));
	};

	return (
		<nav>
			<ul className="pagination justify-content-center">
				<li className={disabled}>
					<button className="page-link" onClick={() => action(actionType, -1)}>
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
				<li className="page-item ">
					<button className="page-link act">{page}</button>
				</li>
				<li className="page-item">
					<button className="page-link" onClick={() => action(actionType, 1)}>
						{page + 1}
					</button>
				</li>
				<li className="page-item">
					<button className="page-link" onClick={() => action(actionType, 2)}>
						{page + 2}
					</button>
				</li>
				<li className="page-item">
					<button className="page-link" onClick={() => action(actionType, 1)}>
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;

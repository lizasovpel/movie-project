import "./Pagination.sass";
import { useDispatch, useSelector } from "react-redux";
import { pageChange } from "../../actions";

const Pagination = () => {
	const { movies } = useSelector((state) => state.movies);
	const { page } = useSelector((state) => state.pages);

	const dispatch = useDispatch();

	const disabled = page === 1 ? "page-item disabled" : "page-item";
	if (movies.length === 0) {
		return <></>;
	}

	return (
		<nav>
			<ul className="pagination justify-content-center">
				<li className={disabled}>
					<button className="page-link" onClick={() => dispatch(pageChange(-1))}>
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
				<li className="page-item ">
					<button className="page-link act">{page}</button>
				</li>
				<li className="page-item">
					<button className="page-link" onClick={() => dispatch(pageChange(1))}>
						{page + 1}
					</button>
				</li>
				<li className="page-item">
					<button className="page-link" onClick={() => dispatch(pageChange(2))}>
						{page + 2}
					</button>
				</li>
				<li className="page-item">
					<button className="page-link" onClick={() => dispatch(pageChange(1))}>
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;

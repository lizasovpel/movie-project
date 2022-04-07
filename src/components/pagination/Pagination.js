import "./Pagination.sass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { pageChange } from "../../actions";

const Pagination = () => {
	const { page } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(page);
	}, [page]);
	const disabled = page === 1 ? "page-item disabled" : "page-item";

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
		// <div className="pagination">
		// 	<div className="buttons">
		// 		<button
		// 			type="button"
		// 			className="btn btn-outline-light w100"
		// 			style={page === 1 ? { visibility: "hidden" } : null}
		// 			onClick={() => dispatch(pageChange(-1))}
		// 		>
		// 			&laquo;
		// 		</button>
		// 		<div className="pageNumber">{page}</div>
		// 		<button type="button" className="btn btn-outline-light w100" onClick={() => dispatch(pageChange(1))}>
		// 			&laquo;
		// 		</button>
		// 	</div>
		// </div>
	);
};

export default Pagination;

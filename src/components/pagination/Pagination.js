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

	return (
		<div className="pagination">
			<div className="buttons">
				<button
					type="button"
					className="btn btn-outline-light w100"
					style={page === 1 ? { visibility: "hidden" } : null}
					onClick={() => dispatch(pageChange(-1))}
				>
					prev
				</button>
				<div className="pageNumber">{page}</div>
				<button type="button" className="btn btn-outline-light w100" onClick={() => dispatch(pageChange(1))}>
					next
				</button>
			</div>
		</div>
	);
};

export default Pagination;

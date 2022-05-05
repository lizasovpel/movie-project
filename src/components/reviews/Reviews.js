import "./Reviews.sass";
import { useDispatch, useSelector } from "react-redux";
import { useHttpGet } from "../../hooks/http.hook";
import { useEffect } from "react";
import { reviewsFetching, reviewsFetched, reviewsFetchingError, reviewsPageChange } from "../../actions";
import Spinner from "../spinner/Spinner";

const Reviews = () => {
	const { movieID } = useSelector((state) => state.movieInfo);
	const { reviewsPage, reviews, reviewsLoadingStatus, totalReviewPages } = useSelector((state) => state.reviews);

	const { request } = useHttpGet();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(reviewsFetching());
		request(
			`https://api.themoviedb.org/3/movie/${movieID}/reviews?${process.env.REACT_APP_KEY}&language=en-US&page=${reviewsPage}`
		)
			.then((data) => dispatch(reviewsFetched(data)))
			.catch(() => dispatch(reviewsFetchingError()));
		// eslint-disable-next-line
	}, [movieID, reviewsPage]);
	if (reviewsLoadingStatus === "loading") {
		return <Spinner />;
	} else if (reviewsLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading Error</h5>;
	}

	const renderReviewsList = (reviews) => {
		return reviews.map(({ author, content, updated_at, url }) => {
			return (
				<div className="review" key={url}>
					<h5 className="name">{author}</h5>
					<p className="text">{content}</p>
					<p>{updated_at.slice(0, 10) + ", " + updated_at.slice(11, 16)}</p>
				</div>
			);
		});
	};

	const elements = renderReviewsList(reviews);
	if (elements.length !== 0) {
		return (
			<div className="reviews">
				<h3 style={{ paddingLeft: "20px" }}>Reviews</h3>
				{elements}
				<button
					type="button"
					className="btn btn-outline-light loadmore"
					onClick={() => dispatch(reviewsPageChange())}
					style={{ display: reviewsPage === totalReviewPages ? "none" : "block" }}
				>
					load more
				</button>
			</div>
		);
	} else {
		return <></>;
	}
};

export default Reviews;

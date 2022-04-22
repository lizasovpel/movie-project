import "./Reviews.sass";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { reviewsFetching, reviewsFetched, reviewsFetchingError } from "../../actions";
import Spinner from "../spinner/Spinner";

const Reviews = () => {
	const { movieID, reviewsPage, reviews, reviewsLoadingStatus } = useSelector((state) => state);
	const { request } = useHttp();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(reviewsFetching());
		request(
			`https://api.themoviedb.org/3/movie/${movieID}/reviews?${process.env.REACT_APP_KEY}&language=en-US&page=${reviewsPage}`
		)
			.then((data) => dispatch(reviewsFetched(data)))
			.catch(() => dispatch(reviewsFetchingError()));
		// eslint-disable-next-line
	}, [movieID]);
	if (reviewsLoadingStatus === "loading") {
		return <Spinner />;
	} else if (reviewsLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Loading Error</h5>;
	}

	const renderReviewsList = (reviews) => {
		return reviews.map(({ author, content, updated_at }) => {
			return (
				<div className="review">
					<h5 className="name">{author}</h5>
					<p className="text">{content}</p>
					<p>{updated_at.slice(0, 10) + ", " + updated_at.slice(11, 16)}</p>
				</div>
			);
		});
	};

	const elements = renderReviewsList(reviews);

	return (
		<div className="reviews">
			<h3 style={{ paddingLeft: "20px" }}>Reviews</h3>
			{elements}
			<button type="button" class="btn btn-outline-light loadmore">
				load more
			</button>
		</div>
	);
};

export default Reviews;

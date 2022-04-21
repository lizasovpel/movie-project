import Genres from "../genres/Genres";
import Movies from "../movies/Movies";
import Pagination from "../pagination/Pagination";

const MoviesPage = () => {
	return (
		<>
			<Genres />
			<Movies />
			<Pagination />
		</>
	);
};

export default MoviesPage;

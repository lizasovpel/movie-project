import Categories from "../categories/Categories";
import Movies from "../movies/Movies";
import Pagination from "../pagination/Pagination";

const MoviesPage = () => {
	return (
		<>
			<Categories />
			<Movies />
			<Pagination />
		</>
	);
};

export default MoviesPage;

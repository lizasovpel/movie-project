import './Movies.sass'
import { Link } from 'react-router-dom'
import poster from '../../img/poster.jpeg'

const Movies = () => {
    // const bgimage = {'backgroundImage': {poster}}
    const rating = '5.0'
    const movieName = 'Movie name'
    const genre = 'Genre'
    return(
        <div className="moviesContainer">
            <h2>Movies</h2>
            <div className="container">
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{movieName}</h4>
                        <p>{genre}</p>
                    </div>
                </Link>


            </div>
            <button type="button" class="btn btn-danger">Load more</button>
        </div>
    )
}
export default Movies
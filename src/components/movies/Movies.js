import './Movies.sass'
import { Link } from 'react-router-dom'
import bg from '../../img/poster.jpeg'
import MovieService from '../../services/MovieService'
import { useState, useEffect } from 'react'

const Movies = () => {
    const [movie, setMovie] = useState({})

    const movieService = new MovieService({})
    const updateState = () => {
        movieService.getMovie(Math.random() * (996 - 2) + 2)
            .then((res) => {setMovie(res)})  
    }
    useEffect(() => {
        updateState();
    }, [])
    const {poster, rating, title, genre, year} = movie
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
                        <h4>{title}</h4>
                        <p>{genre}, {year} </p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{title}</h4>
                        <p>{genre}, {year} </p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{title}</h4>
                        <p>{genre}, {year} </p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{title}</h4>
                        <p>{genre}, {year} </p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{title}</h4>
                        <p>{genre}, {year} </p>
                    </div>
                </Link>
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{title}</h4>
                        <p>{genre}, {year} </p>
                    </div>
                </Link>


            </div>
            <button type="button" class="btn btn-danger">Load more</button>
        </div>
    )
}
export default Movies
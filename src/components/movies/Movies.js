import './Movies.sass'
import { Link } from 'react-router-dom'
import bg from '../../img/poster.jpeg'
import MovieService from '../../services/MovieService'
import { useState, useEffect } from 'react'

const Movies = () => {

    const [moviesList, setMoviesList] = useState([])  

    const movieService = new MovieService()

    const updateState = () => {
        movieService.getMovies(1)
            .then((res) => {setMoviesList(res)})  
    }

    useEffect(() => {
        updateState();
    }, [])

    const renderItems = (arr) => {
        const items = arr.map((item) => {
            const {poster, rating, title, year} = item

            return (
                <Link to="movieInfo">
                    <div className="movieCard">
                        <div className="movieImage">
                            <img src={poster} alt="poster" />
                            <div className="rating">{rating}</div>
                        </div>
                        <h4>{title}</h4>
                        <p>{year} </p>
                    </div>
                </Link>

            )
        })
        return (
            <>
            {items}
            </>
        )
    }
    const content = renderItems(moviesList)
    return(
        <div className="moviesContainer">
            <h2>Movies</h2>
            <div className="container">
            {content}

            </div>
            <button type="button" class="btn btn-danger">Load more</button>
        </div>
    )
}
export default Movies
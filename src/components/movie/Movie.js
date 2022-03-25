import './Movie.sass'
import poster from '../../img/poster.jpeg'

const Movie = () => {
    return(
        <div className="movieContainer">
            <h2>Movie name</h2>
            <div className="cont">
                <div className="poster">
                    <img src={poster} alt="poster" />
                </div>
                <div className="info">
                    <div className="description">
                        <p>Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta cum et veniam earum ducimus sunt, culpa sapiente corporis ipsam blanditiis ipsa reiciendis nihil ea. Est sed repudiandae debitis, odit culpa at quidem, qui quaerat consectetur laboriosam ratione cum cumque sint corrupti facilis doloremque iusto, ipsam obcaecati. Laboriosam architecto sequi et.</p>
                    </div>
                    <div className="extraInfo">
                        <p>Genre, year</p>
                        <p>rating</p>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Movie
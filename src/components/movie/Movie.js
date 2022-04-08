import "./Movie.sass";
import bg from "../../img/FCBG.webp";
import poster from "../../img/FCposter.jpeg";
import stars from "../../img/stars.png";

const Movie = () => {
	return (
		<div className="movieContainer">
			<img className="bg" src={bg} alt="bg" />
			<div className="layer"></div>

			<div className="top">
				<div className="title">
					<h2>Fight Club</h2>
					<div className="vote">
						<p>7.8</p>
						<img src={stars} alt="" />
					</div>
				</div>

				<div className="details">
					<div className="poster">
						<img src={poster} alt="" />
					</div>
					<div className="info">
						<h4>How much can you know about yourself if you've never been in a fight?</h4>
						<p>
							year: <b>1999</b>
						</p>
						<p>
							genre: <b>drama, criminal</b>
						</p>
						<p>
							country: <b>US</b>
						</p>
						<p>
							revenue: <b>100853753$</b>
						</p>
						<p>
							runtime: <b>139 m</b>
						</p>
						<p>
							cast members:{" "}
							<b>
								Brad Pitt, Edward Norton, Meat Loaf, Zach Grenier, Richmond Arquette, David Andrews,
								George Maguire
							</b>
						</p>
					</div>
				</div>
				<div className="overview">
					<h3>Overview</h3>
					<p>
						A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a
						shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming
						in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward
						oblivion.
					</p>
				</div>
				<div className="reviews">
					<h3 style={{ paddingLeft: "20px" }}>Reviews</h3>
					<div className="review">
						<h5 className="name">onthestree</h5>
						<p className="text">
							Because you'll probably be confused the first time around. It's not a coincidence it stars
							some of the greatest actors of our time.
						</p>
						<p>11 February 2020</p>
					</div>
					<div className="review">
						<h5 className="name">onthestree</h5>
						<p className="text">
							Because you'll probably be confused the first time around. It's not a coincidence it stars
							some of the greatest actors of our time.
						</p>
						<p>11 February 2020</p>
					</div>
					<div className="review">
						<h5 className="name">onthestree</h5>
						<p className="text">
							Because you'll probably be confused the first time around. It's not a coincidence it stars
							some of the greatest actors of our time.
						</p>
						<p>11 February 2020</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Movie;

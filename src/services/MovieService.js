
class MovieService {
    _apiBase = 'https://api.themoviedb.org'
    _apiKey = 'api_key=65c77c52934950e077d6655d92b89d39&'
    
    getData = async (url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }
        return await res.json()
    }

    getMovies = async(page) => {
        const res = await this.getData(`${this._apiBase}/3/movie/popular?${this._apiKey}&language=en-US&page=${page}`)  
        return res.results.map(item => this._transformMovieData(item))
        
    }

    getMovie = async(id) => { 
        const res = await this.getData(`${this._apiBase}/3/movie/${id}?${this._apiKey}&language=en-US`)
        return this._transformMovieData(res)
    }


    _transformMovieData = (res) => {
        return {
            title: res.title,
            genre: res.genre_ids,
            rating: res.vote_average,
            year: res.release_date.slice(0,4),
            poster: `https://image.tmdb.org/t/p/original${res.poster_path}`,
            description: res.overview,
            key: res.id
        }
    }
}

export default MovieService
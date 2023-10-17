import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js'


function MoviesCardList({movies, onMovieLike, onMovieDelete}){
    return(
        <section className='movies-list'>
            <ul className='movies-list__cards'>
                {
                    movies.map((movie)=>{
                        return(
                            <MoviesCard 
                                movie={movie}
                                key={movie.id || movie._id}
                                onMovieDelete={onMovieDelete}
                                onMovieLike={onMovieLike}
                            />
                        );
                    })
                }
            </ul>
        </section>
    )
}

export default MoviesCardList;
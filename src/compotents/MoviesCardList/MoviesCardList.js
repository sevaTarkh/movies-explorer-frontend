import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js'


function MoviesCardList({movies}){
    return(
        <ul className='movies-list'>
            {
               movies.map((movie)=>{
                  return(
                     <MoviesCard 
                        movie={movie}
                        key={movie.id}
                    />
                  );
               })
            }
        </ul>
    )
}

export default MoviesCardList;
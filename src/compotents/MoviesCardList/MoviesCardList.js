import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js'


function MoviesCardList({movies}){
    return(
        <section className='movies-list'>
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
        </section>
    )
}

export default MoviesCardList;
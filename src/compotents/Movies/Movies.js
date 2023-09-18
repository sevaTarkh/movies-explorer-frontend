import './Movies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js'
import Preloader from '../Preloader/Preloader.js';
import Searchform from '../Searchform/Searchform.js';
import movie from '../../utils/MoviesList.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'

function Movies(){

    
    return(
        <section className='movies'>
            <Header/>
            <Searchform/>
            <MoviesCardList 
                movies={movie}
            />
            <button className='button movies__button-more'>Еще</button>
            <Footer/>
        </section>
    )
}

export default Movies;
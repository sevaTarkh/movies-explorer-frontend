import './Movies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js'
import Preloader from '../Preloader/Preloader.js';
import Searchform from '../Searchform/Searchform.js';
import movie from '../../utils/MoviesList.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'

function Movies(){

    
    return(
        <>
            <Header/>
            <main className='movies'>
                <Searchform/>
                <MoviesCardList
                    movies={movie}
                />
                <button className='button movies__button-more' type='button'>Еще</button>
            </main>
            <Footer/>
        </>
    )
}

export default Movies;
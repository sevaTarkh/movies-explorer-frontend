import './SavedMovies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Searchform from '../Searchform/Searchform.js';
import saved from '../../utils/Saved.js'

function SavedMovies(){
    return(
        <section className='saved-movies'>
            <Header/>
            <Searchform/>
            <MoviesCardList movies={saved}/>
            <Footer/>
        </section>
    )
}

export default SavedMovies;
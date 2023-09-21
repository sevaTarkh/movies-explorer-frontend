import './SavedMovies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Searchform from '../Searchform/Searchform.js';
import saved from '../../utils/Saved.js'

function SavedMovies(){
    return(
        <>
            <Header/>
            <main className='saved-movies'>
                <Searchform/>
                <MoviesCardList movies={saved}/>
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;
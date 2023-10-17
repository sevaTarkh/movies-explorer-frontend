import React, {useState, useEffect} from 'react';
import './SavedMovies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Searchform from '../Searchform/Searchform.js';
import Preloader from '../Preloader/Preloader.js';
import api from '../../utils/MainApi.js'
import { NOT_FOUND, SERVER_ERROR } from '../../utils/constants';

function SavedMovies(){
    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || [])
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [errorMessage, setErrorMessage] = useState('');
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    

    useEffect(()=>{
        console.log('123123')
        setIsLoading(true);    
        api.getSavedMovies(token)
            .then((newMovies)=>{
                setMovies(newMovies)
                setIsLoading(false);
                localStorage.setItem('saved-movies', JSON.stringify(newMovies));
            })
            .catch((err)=>{
                console.log(err)
                setIsLoading(false);
                setServerErrorMessage(SERVER_ERROR)
            })
    }, [token])

    function searchFilter(array, inputValue, shortFilm) {
        if (!array) {
          return [];
        }
        let filtered = [...array];
        if (inputValue) {
          filtered = filtered.filter((element) => element.nameRU
            .toLowerCase()
            .includes(inputValue.toLowerCase()));
        }
        if (shortFilm) {
          return filtered.filter((element) => element.duration <= 40);
        }
        return filtered;
    }
   
    const filter = (inputValue, shortFilm) =>{
        const storedMovies = JSON.parse(localStorage.getItem('saved-movies'));
        const filtered = searchFilter(storedMovies, inputValue, shortFilm);
        console.log(filtered)
        setMovies(filtered)
        if (filtered.length === 0){
            setErrorMessage(NOT_FOUND)
        }else{
            setErrorMessage('')
        }
    }
    
    const handleFilterSavedMovies = (inputValue, shortFilm) =>{
        filter(inputValue, shortFilm) 
    }

    const handleFilterMovies = (movies, id) => {
        return movies.filter((item) => item._id !== id)
    }

    const handleDeleteMovie = (movie, setIsSaved) => {
        let savedMovies = JSON.parse(localStorage.getItem('saved-movies'))
        api.handleRemoveMovie(movie._id, token)
        .then(() =>{
            setIsSaved(false);
            const SavedmoviesFilterList = handleFilterMovies(movies, movie._id)
            const SavedmoviesList = handleFilterMovies(savedMovies, movie._id)
            setMovies((SavedmoviesFilterList))
            localStorage.setItem('saved-movies', JSON.stringify(SavedmoviesList));
        })
        .catch((err)=>{
            console.log(err)
        }) 
    }

    return(
        <>
            <Header/>
            <main className='saved-movies'>
                <Searchform getAnyMovies={handleFilterSavedMovies}/>
                {isLoading 
                    ?   <Preloader/> 
                    :   <MoviesCardList 
                            movies={movies}
                            onMovieDelete={handleDeleteMovie}
                        />
                }
                {(errorMessage || serverErrorMessage) && (
                    <p className='movies__error-message'>{errorMessage || serverErrorMessage}</p>
                )}
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;
import React, {useState, useEffect} from 'react';
import './SavedMovies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Searchform from '../Searchform/Searchform.js';
import Preloader from '../Preloader/Preloader.js';
import api from '../../utils/MainApi.js'

function SavedMovies(){
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [errorMessage, setErrorMessage] = useState('');
    const [serverErrorMessage, setServerErrorMessage] = useState('');


    useEffect(()=>{
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
                setServerErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
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
        setMovies(filtered)
        if (filtered.length === 0){
            setErrorMessage('Ничего не найдено')
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
        console.log(movie)
        api.handleRemoveMovie(movie._id, token)
        .then(() =>{
            setIsSaved(false);
            const SavedmoviesList = handleFilterMovies(movies, movie._id)
            setMovies(SavedmoviesList)
            console.log(movies)
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
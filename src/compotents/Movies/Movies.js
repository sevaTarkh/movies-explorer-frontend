import React, {useState, useEffect} from 'react';
import './Movies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js'
import Preloader from '../Preloader/Preloader.js';
import Searchform from '../Searchform/Searchform.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import moviesApi from '../../utils/MoviesApi.js';
import api from '../../utils/MainApi.js'
import { 
    NOT_FOUND, 
    SERVER_ERROR,
    MOVIE_DURATION,
    PC_MOVIES,
    LAPTOPD_MOVIES,
    PHONE_MOVIES,
    PC_ADD_MOVIES,
    LAPTOP_ADD_MOVIES,
    PC_WIDTH,
    LAPTOP_WIDTH
} from '../../utils/constants';

function Movies(){
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [amountFromWidth, setamountFromWidth] = useState(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [buttonMoreHide, setButtonMoreHide] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(()=>{
        let savedMovies = JSON.parse(localStorage.getItem('saved-movies'))
        if (!savedMovies){
            setIsLoading(true);    
            api.getSavedMovies(token)
                .then((newMovies)=>{
                    setIsLoading(false);
                    localStorage.setItem('saved-movies', JSON.stringify(newMovies));
                })
                .catch((err)=>{
                    console.log(err)
                    setIsLoading(false);
                    setServerErrorMessage(SERVER_ERROR)
                })
        }
    }, [token])

    function debounce(func, ms) {
        let timer;
        return () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            func.apply(this, arguments);
          }, ms);
        };
    }

    const handleSaveMovie = (movie, setIsSaved) => {
        api.saveMovie(movie, token)
          .then((newMovie)=>{
            let savedMovies = JSON.parse(localStorage.getItem('saved-movies'))
            savedMovies.push(newMovie)
            setIsSaved(true)
            localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
          })
          .catch((err)=>{
            console.log(err)
          })
    }

    const handleDeleteMovie = (movie, setIsSaved) => {
        let savedMovies = JSON.parse(localStorage.getItem('saved-movies'))
        const savedMovieId = savedMovies.find((item) => item.movieId === movie.id);
        api.handleRemoveMovie(savedMovieId._id, token)
        .then(() =>{
            setIsSaved(false)
            let indexSavedMovie = 0;
            for (let i = 0; i < savedMovies.length; i++) {
                const film = savedMovies[i];
                if (film.movieId === movie.id) {
                    indexSavedMovie = i;
                    console.log(indexSavedMovie)
                }
            }
            savedMovies.splice(indexSavedMovie, 1);
            localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const handleResize = debounce(() => {
        setWindowSize(window.innerWidth);
      }, 50);

    useEffect(()=>{
        if (moviesList === null){
            setButtonMoreHide(false)
        }
        if (amountFromWidth > moviesList.length){
            setButtonMoreHide(false)
        } else{
            setButtonMoreHide(true)
        }
    }, [setButtonMoreHide, moviesList, amountFromWidth])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    useEffect(()=>{
        if (windowSize > PC_WIDTH) {
            setamountFromWidth(PC_MOVIES)
        }  
        if(windowSize < PC_WIDTH && windowSize > LAPTOP_WIDTH) {
            setamountFromWidth(LAPTOPD_MOVIES)
        } 
        if(windowSize < LAPTOP_WIDTH) {
            setamountFromWidth(PHONE_MOVIES)
        }
    }, [setamountFromWidth, windowSize])

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
          return filtered.filter((element) => element.duration <= MOVIE_DURATION);
        }
        return filtered;
    }

    const filter = (inputValue, shortFilm) => {
        const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
        const filtered = searchFilter(storedMovies, inputValue, shortFilm);
        setMoviesList(filtered);
        if (filtered.length === 0){
            setErrorMessage(NOT_FOUND)
        }else{
            setErrorMessage('')
        }
    };

    const getMoviesList = (inputValue, shortFilm) =>{
        setButtonMoreHide(false)
        setErrorMessage('')
        setIsLoading(true);
            moviesApi.getMovies()
            .then((movies) => {
                localStorage.setItem('movies', JSON.stringify(movies))
                filter(inputValue, shortFilm)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setServerErrorMessage(SERVER_ERROR)
            })
    }

    const handleAddFilms = () => {
        if (windowSize > PC_WIDTH) {
            setamountFromWidth(amountFromWidth + PC_ADD_MOVIES)
        }  
        if(windowSize < PC_WIDTH) {
            setamountFromWidth(amountFromWidth + LAPTOP_ADD_MOVIES)
        } 
    }

    return(
        <>
            <Header/>
            <main className='movies'>
                <Searchform getAnyMovies={getMoviesList}/>
                {isLoading 
                    ? <Preloader/> 
                    : <MoviesCardList
                        movies={
                            moviesList.slice(0, amountFromWidth)
                        }
                        onMovieDelete={handleDeleteMovie}
                        onMovieLike={handleSaveMovie}
                    />
                }
                {(errorMessage || serverErrorMessage) && (
                    <p className='movies__error-message'>{errorMessage || serverErrorMessage}</p>
                )}
                {buttonMoreHide ? 
                    <button className='button movies__button-more' type='button' onClick={handleAddFilms}>Еще</button>
                    : ''
                }
            </main>
            <Footer/>
        </>
    )
}

export default Movies;
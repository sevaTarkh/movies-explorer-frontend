import React, {useState, useEffect} from 'react';
import './Movies.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js'
import Preloader from '../Preloader/Preloader.js';
import Searchform from '../Searchform/Searchform.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import moviesApi from '../../utils/MoviesApi.js';
import api from '../../utils/MainApi.js'

function Movies(){
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [amountFromWidth, setamountFromWidth] = useState(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [buttonMoreHide, setButtonMoreHide] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const [saveId, setSavedId] = useState('')

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
                    setServerErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
                })
        }
    }, [])


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
            setSavedId(newMovie._id)
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
        console.log(saveId)
        let savedMovies = JSON.parse(localStorage.getItem('saved-movies'))
        const savedMovieId = savedMovies.find((item) => item.movieId === movie.id);
        console.log(savedMovieId)
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
        if (windowSize > 888) {
            setamountFromWidth(12)
        }  
        if(windowSize < 888 && windowSize > 589) {
            setamountFromWidth(8)
        } 
        if(windowSize < 589) {
            setamountFromWidth(5)
        }
    }, [setamountFromWidth, windowSize])



    function searchFilter(array, inputValue, shortFilm) {
        if (!array) {
          return [];
        }
        let filtered = [...array];
        console.log(inputValue)
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


    const filter = (inputValue, shortFilm) => {
        const storedMovies = JSON.parse(localStorage.getItem('movies'));
        const filtered = searchFilter(storedMovies, inputValue, shortFilm);
        setMoviesList(filtered);
        if (filtered.length === 0){
            setErrorMessage('Ничего не найдено')
        }else{
            setErrorMessage('')
        }
    };


    const getMoviesList = (inputValue, shortFilm) =>{
        setButtonMoreHide(false)
        setErrorMessage('')
        setIsLoading(true);
        if(inputValue){
            moviesApi.getMovies()
            .then((movies) => {
                localStorage.setItem('movies', JSON.stringify(movies))
                filter(inputValue, shortFilm)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setServerErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            })
        } else {
            setIsLoading(false);
        }
    }


    const handleAddFilms = () => {
        if (windowSize > 888) {
            setamountFromWidth(amountFromWidth + 3)
        }  
        if(windowSize < 888) {
            setamountFromWidth(amountFromWidth + 2)
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
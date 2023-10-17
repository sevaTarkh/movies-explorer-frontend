import './MoviesCard.css';
import save from '../../images/save3.svg';
import deletemoviekrest from '../../images/deletemovie.svg';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function MoviesCard({movie, onMovieLike, onMovieDelete}){
    const [isSave, setIsSaved] = useState(false)
    const location = useLocation();
    
    useEffect(() => {         
        let savedMovies = JSON.parse(localStorage.getItem('saved-movies')) 
        if (savedMovies.some((item) => item.movieId ===  movie.id)) {           
            setIsSaved(true); 
        }  
    }, [ movie.id]);

    const handleSaveMovie = () => {
        onMovieLike(movie, setIsSaved)
    }

    const handleDeleteMovie = () => {
        onMovieDelete(movie, setIsSaved)
    }
    
    return(
        <li className='movie'>
            <a className='movie__image-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
                <img alt={movie.nameRU} className='movie__image' src={location.pathname === '/saved-movies' ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}/>
            </a>
            <div className='movie__bottom-container'>
                <h2 className='movie__name'>{movie.nameRU}</h2>
                <div className='movie__duration'>{`${Math.floor(movie.duration/60)}ч ${(movie.duration % 60)}м`}</div>
            </div>
            {location.pathname === '/movies' ?
                <button type='button' className={`button ${isSave ? 'movie__button-save': 'movie__button'}`} onClick={!isSave ? handleSaveMovie : handleDeleteMovie} >
                    {isSave ? <img src={save} alt='фото галочки' className='movie__save'/> : 'Сохранить'}
                </button>
              :  
                <button type='button' className='button movie__button-delete' onClick={handleDeleteMovie}>
                    <img className='movie__delete' alt='фото крестика' src={deletemoviekrest}/>
                </button>  
            }
        </li>   
    )
}

export default MoviesCard;
import './MoviesCard.css';
import save from '../../images/save3.svg';
import deletemovie from '../../images/deletemovie.svg';
import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

function MoviesCard({movie}){
    const location = useLocation();
    const [isSave, isSaved] = useState(false);
    return(
        <li className='movie'>
            <a className='movie__image-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
                <img alt={movie.nameRU} className='movie__image' src={movie.image}/>
            </a>
            <div className='movie__bottom-container'>
                <h2 className='movie__name'>{movie.nameRU}</h2>
                <div className='movie__duration'>{movie.duration}</div>
            </div>
            {location.pathname === '/movies' ?
                <button type='button' className={`button ${isSave ? 'movie__button-save': 'movie__button'}`} onClick={()=>{
                    isSaved(true)
                }}>
                    {isSave ? <img src={save} alt='фото галочки' className='movie__save'/> : 'Сохранить'}
                </button>
              :  
                <button type='button' className='button movie__button-delete'>
                    <img className='movie__delete' alt='фото крестика' src={deletemovie}/>
                </button>  
            }
        </li>   
    )
}

export default MoviesCard;
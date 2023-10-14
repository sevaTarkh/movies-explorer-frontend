import './Searchform.css';
import lypa from '../../images/lypa.svg';
import React, {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';

function Searchform({getAnyMovies}){
    const [inputValue, setInputValue] = useState('');
    const [shortFilm, setShortFilm] = useState(false);
    const [inputValueEmpty, setInputValueEmpty] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname === '/movies'){
            const lastInputValue = localStorage.getItem('inputValue')
            const lastCheckBoxValue = JSON.parse(localStorage.getItem('shortFilm'))
            if(lastInputValue){
                setInputValue(lastInputValue)
            }
            if(lastCheckBoxValue){
                setShortFilm(lastCheckBoxValue)
            }
            if(lastInputValue || lastCheckBoxValue === true){
                getAnyMovies(lastInputValue, lastCheckBoxValue)
            }
        }
        
    }, [])

    const handleFilterFilm = () => {
        setShortFilm(!shortFilm)
        getAnyMovies(inputValue, !shortFilm)
        if (location.pathname === '/movies'){
            localStorage.setItem('shortFilm', !shortFilm)
        }
    }
    const inputChange = (e) => {
        setInputValue(e.target.value)
    }
    const getMoviesList = (e) => {
        e.preventDefault()
        if (location.pathname === '/movies'){
            localStorage.setItem('inputValue', inputValue)
        }
        if (!inputValue){
            setInputValueEmpty(true)
        }else{
            setInputValueEmpty(false) 
        }
        getAnyMovies(inputValue, shortFilm)
    }
    return(
        <section className='search'>
            <form className='search__form' onSubmit={getMoviesList} noValidate>
                <div className='search__input-container'>
                    <img className='search__icon' alt='лупа' src={lypa}/>
                    <div className='search__form-container'>
                        <input
                            className='search__input'
                            id='search-film'
                            placeholder='Фильмы'
                            required
                            type='text'
                            onChange={inputChange}
                            value={inputValue ? inputValue : ''}
                        />
                        {inputValueEmpty && (<p className='search__input-value'>Нужно ввести ключевое слово</p>)}
                        <button type='submit' className='button search__button'>Найти</button>
                    </div>
                </div>
                    <div className='search__filter-container'>
                        <label className='link search__input-switch'>
                            <input
                                type='checkbox'
                                className='search__input-checkbox'
                                onChange={handleFilterFilm}
                                checked={shortFilm}
                            />
                            <span className='slider round'/>
                        </label>
                        <p className='search__text'>
                            Короткометражки
                        </p>
                    </div>
            </form>      
        </section>
    )
}

export default Searchform;
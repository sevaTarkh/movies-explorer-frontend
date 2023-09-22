import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import './Navigation.css';
import icon from '../../images/manIconHeader.svg';
import iconblack from '../../images/iconblack.svg';
import burger from '../../images/burger.svg';
import krest from '../../images/krest.svg';


function Navigation(){
    const [isOpen, isOpenened] = useState(false);
    const location = useLocation();

    return(
        <>
            <nav className='header__navigation'>
                <Link to='/movies' className='link header__link-login'>
                    <p className='header__text-nav'>Фильмы</p>
                </Link>
                <Link to='/saved-movies' className='link header__link-login'>
                    <p className='header__text-nav'>Сохраненные фильмы</p>
                </Link>
                <Link to='/profile' className='link header__link'>
                    <div className='header__profile-container'>
                        <p className='header__text-acc'>Аккаунт</p>
                        <div className={` ${location.pathname === '/' ? 'header__icon-container' : 'header__icon-black'}`}>
                            <img src={location.pathname === '/' ? icon : iconblack} className= 'header__icon' alt='фото человечка'/>
                        </div>
                    </div>
                </Link>
            </nav>
            <button type='button' className='button header__burger' onClick={() => {
                isOpenened(true);
            } }>
                <img src={burger} alt='иконка меню'/>
            </button>
            <div className={`overlay ${isOpen ? 'overlay-visible': ''}`}>
                <div className={`header__burger-menu ${isOpen ? 'open-menu' : 'close-menu'}`}>
                    <nav className='header__burger-navigation'>
                        <Link to='/' className='link header__link-nav'>
                            <p className='header__text-nav'>Главная</p>
                        </Link>
                        <Link to='/movies' className='link header__link-nav'>
                            <p className='header__text-nav'>Фильмы</p>
                        </Link>
                        <Link to='/saved-movies' className='link header__link-nav'>
                            <p className='header__text-nav'>Сохраненные фильмы</p>
                        </Link>
                        <Link to='/profile' className='link header__link-nav'>
                            <div className='header__profile-container'>
                                <p className='header__text-acc'>Аккаунт</p>
                                <div className='header__icon-black'>
                                    <img src={iconblack} className= 'header__icon' alt='фото человечка'/>
                                </div>
                            </div>
                        </Link>
                    </nav>
                    <button type='button' className='button header__burger-button' onClick={() => {
                        isOpenened(false);
                    }}>
                        <img src={krest} className='button__close' alt='фото крестика'/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navigation;
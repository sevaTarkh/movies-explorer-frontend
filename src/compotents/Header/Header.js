import logo from '../../images/logoHeader.svg';
import icon from '../../images/manIconHeader.svg';
import iconblack from '../../images/iconblack.svg';
import burger from '../../images/burger.svg';
import krest from '../../images/krest.svg';
import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Header.css'

function Header(){
    //const loggedIn = false;
    const location = useLocation();
    const [isOpen, isOpenened] = useState(false);
    return(
        
        <header className ={`header  ${location.pathname === '/' ? 'main__header' : 'white__header'}`}>
            <Link to='/'><img className='logo header__logo' src={logo} alt='фото логотипа'/></Link>
                { true  ?
                    <>
                        <nav className='header__navigation'>
                            <Link to='/movies' className='link header__link'>
                                <p className='header__text-nav'>Фильмы</p>
                            </Link>
                            <Link to='/saved-movies' className='link header__link'>
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
                                <img src={burger} alt='burger'/>
                            </button>
                        <div className={`overlay ${isOpen ? 'overlay__visible': ''}`}>
                            <div className={`header__burger-menu ${isOpen ? 'open__menu' : 'close__menu'}`}>
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
                                }  } >
                                    <img className='button__close' src={krest} alt='фото крестика'/>
                                </button>
                            </div>
                        </div>
                    </> 
                : 
                    <nav className='header__navigation'>
                        <Link to='/signup' className='header__link'>
                            <p className='header__text'>Регистрация</p>
                        </Link>
                        <Link to='/signin' className='header__link header__link_theme_dark'>
                            <p className='header__text header__text_theme_white'>Войти</p>
                        </Link>
                    </nav>
                }
        </header>
    )
};

export default Header;
     

    //
//<nav className='header__navigation'>
//    <Link to='/movies' className='link header__link-nav'>
//         <p className='header__text-nav'>Фильмы</p>
//    </Link>
//    <Link to='/saved-movies' className='link header__link-nav'>
//      <p className='header__text-nav'>Сохраненные фильмы</p>
//    </Link>
//    <Link to='/profile' className='link header__link-nav'>
//    <div className='header__profile-container'>
//                  <p className='header__text-acc'>Аккаунт</p>
//                  <div className={` ${location.pathname === '/' ? 'header__icon-container' : 'header__icon-black'}`}>
//                     <img src={location.pathname === '/' ? icon : iconblack} className= 'header__icon' alt='фото человечка'/>
//                 </div>
//             </div>
//     </Link>
//  </nav>


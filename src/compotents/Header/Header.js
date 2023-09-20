import logo from '../../images/logoHeader.svg';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Header.css'
import Navigation from '../Navigation/Navigation.js'
function Header(){
    const location = useLocation();
    
    return(
        
        <header className ={`header  ${location.pathname === '/' ? 'header__main' : 'header__white'}`}>
            <Link to='/'><img className='logo header__logo' src={logo} alt='фото логотипа'/></Link>
                { true  ?
                    <Navigation/>
                : 
                    <nav className='header__navigation-unlog'>
                        <Link to='/signup' className='link header__link'>
                            <p className='header__text'>Регистрация</p>
                        </Link>
                        <Link to='/signin' className='link header__link header__link_theme_dark'>
                            <p className='header__text header__text_theme_white'>Войти</p>
                        </Link>
                    </nav>
                }
        </header>
    )
};

export default Header;


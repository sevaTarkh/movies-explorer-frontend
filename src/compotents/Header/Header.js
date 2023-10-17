import logo from '../../images/logoHeader.svg';
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Header.css'
import Navigation from '../Navigation/Navigation.js'

function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation();


    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
    }, [])
    return(
        
        <header className ={`header  ${location.pathname === '/' ? 'header-main' : 'header-white'}`}>
            <Link to='/'><img className='logo header__logo' src={logo} alt='фото логотипа'/></Link>
                { isLoggedIn  ?
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


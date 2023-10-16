import React from 'react';
import './Login.css';
import logo from '../../images/logoHeader.svg';
import { Link } from 'react-router-dom';
import './Login.css';
import {useFormValiditi} from '../../hooks/useFormValidity.js';

const Login = ({loginUser, isLoading}) =>{
    const [ values, errors, isValid, handleChange ] = useFormValiditi();



    const handleSubmit = (e) =>{
        e.preventDefault();
        const { email, password } = values;
        loginUser({ email, password })
    }
    return (
        <main className='login'>
            <div className=' login__container'>
                <div className='login__top'>
                    <Link to='/'>
                        <img  className='logo login__logo' src={logo} alt='логотип'/>
                    </Link>
                    <h1 className='login__title'>Рады видеть!</h1>
                </div>
                <form className='login__form' onSubmit={handleSubmit} noValidate autoComplete="off">
                    <label className='login__form-text'>email</label>
                    <input
                        className='popup-field'
                        placeholder='email'
                        id='email'
                        required
                        name='email'
                        type='email'
                        value={values.email ? values.email : ''}
                        onChange={handleChange}
                        autoComplete='off'
                        pattern='^.+@.+\..+$'
                        disabled={isLoading}
                    />
                    <span className='register__error'>{errors.email}</span>
                    <label className='login__form-text'>Пароль</label>
                    <input
                        className='popup-field'
                        placeholder='Пароль'
                        id='password'
                        required
                        name='password'
                        type='password'
                        value={values.password ? values.password : ''}
                        onChange={handleChange}
                        minLength={8}
                        maxLength={16}
                        autoComplete='off'
                        disabled={isLoading}
                    />
                    <span className='register__error'>{errors.password}</span>
                    <button type='submit' className={` login__button ${(!isValid || isLoading) ? 'button__disabled' : 'button'}`} disabled={(!isValid || isLoading) ? true : false}>Войти</button>
                </form>
                <p className='login__question'>
                    Еще не зарегестрированы? 
                    <Link to='/signup' className='link login__link'>Регистрация</Link>
                </p>
            </div>
        </main>
    )
}


export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logoHeader.svg';
import './Register.css';
import {useFormValiditi} from '../../hooks/useFormValidity.js';

const Register = ({registerUser, isLoading}) => {
    const [ values, errors, isValid, handleChange ] = useFormValiditi();

    function handleSubmit(e) {
        e.preventDefault();
        const { name, email, password } = values;
        registerUser({ name, email, password })
    }
    
    return(
        <main className='register'>
            <div className=' register__container'>
                <div className='register__top'>
                    <Link to='/'>
                        <img  className='logo register__logo' src={logo} alt='логотип'/>
                    </Link>
                    <h1 className='register__title'>Добро пожаловать!</h1>
                </div>
                <form className='register__form' onSubmit={handleSubmit} noValidate>
                    <label className='register__form-text'>Имя</label>
                    <input
                        className='popup-field'
                        placeholder='name'
                        id='name'
                        required
                        name='name'
                        type='text'
                        value={values.name ? values.name : ''}
                        onChange={handleChange}
                        minLength={2}
                        maxLength={15}
                        autoComplete="off"
                        disabled={isLoading}
                    />
                    <span className='register__error'>{errors.name}</span>
                    <label className='register__form-text'>E-mail</label>
                    <input
                        className='popup-field'
                        placeholder='email'
                        id='email'
                        required
                        name='email'
                        type='email'
                        value={values.email ? values.email : ''}
                        onChange={handleChange}
                        autoComplete="off"
                        pattern='^.+@.+\..+$'
                        disabled={isLoading}
                    />
                    <span className='register__error'>{errors.email}</span>
                    <label className='register__form-text'>Пароль</label>
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
                        disabled={isLoading}
                    />
                    <span className='register__error'>{errors.password}</span>
                    <button type='submit' className={` register__button ${(!isValid || isLoading) ? 'button__disabled' : 'button'}`} disabled={(!isValid || isLoading) ? true : false}>Зарегестрироваться</button>
                </form>
                <p className='register__question'>
                    Уже зарегестрированы? 
                    <Link to='/signin' className='link register__link'>Войти</Link>
                </p>
            </div>
        </main>     
    )
}

export default Register;
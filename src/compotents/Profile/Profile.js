import './Profile.css';
import Header from '../Header/Header.js';
import React, { useEffect, useContext } from 'react';
import {useFormValiditi} from '../../hooks/useFormValidity.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

function Profile({handleUpdateUserInfo, logedOut}){
    const [ values, errors, isValid, handleChange, setValues ] = useFormValiditi();

    const { currentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email 
        });
    }, [setValues, currentUser.name, currentUser.email])

    const updateUserInfo = (e) => {
        e.preventDefault()
        const { name, email } = values;
        handleUpdateUserInfo({ name, email });
    }
    const logedOutFromAccaunt = () => {
        logedOut()
    }
    
    const isEditButtonValid = isValid && (values.name !== currentUser.name || values.email !== currentUser.email);

    return(
        <>
            <Header/>
            <main className='profile'>
                <section className='profile__container'>
                    <h1 className='profile__hello'>{`Привет, ${currentUser.name}!`}</h1>
                    <form className='profile__form' onSubmit={updateUserInfo}>
                        <div className='profile__input-container'>
                            <label className='profile__input-text'>
                                Имя
                            </label>
                            <input 
                                className='profile__input'
                                id='name-profile'
                                required
                                type='text'
                                placeholder='username'
                                name='name'
                                minLength={2}
                                maxLength={15}
                                value={values.name ? values.name : ''}
                                pattern='/.+@.+\..+/'
                                onChange={handleChange}
                            />
                        </div>
                        <span className='register__error'>{errors.name}</span>
                        <div className='profile__input-container'>
                            <label className='profile__input-text'>
                                E-mail
                            </label>
                            <input 
                                className='profile__input'
                                id='email-profile'
                                required
                                type='email'
                                placeholder='email'
                                name='email'
                                value={values.email ? values.email : ''}
                                onChange={handleChange}
                            />
                        </div>
                        <span className='register__error'>{errors.email}</span>
                        <button className={`profile__edit-button ${!isEditButtonValid? 'button-edit__disabled' : 'button'}`} type='submit' disabled={!isEditButtonValid ? true : false}>Редактировать</button>
                        <button className='button profile__exit-button' type='button' onClick={logedOutFromAccaunt}>Выйти из аккаунта</button>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Profile
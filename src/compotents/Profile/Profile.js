import './Profile.css';
import Header from '../Header/Header.js';
import { useNavigate } from 'react-router-dom';

function Profile(){
    const navigate = useNavigate()

    return(
        <>
            <Header/>
            <main className='profile'>
                
                <section className='profile__container'>
                    <h1 className='profile__hello'>Привет, Всеволод!</h1>
                    <form className='profile__form'>
                        <div className='profile__input-container'>
                            <label className='profile__input-text'>
                                Имя
                            </label>
                            <input 
                                className='profile__input'
                                id='name'
                                required
                                type='text'
                                placeholder='username'
                                name='name-profile'
                                minLength={2}
                                maxLength={15}
                            />
                        </div>
                        <div className='profile__input-container'>
                            <label className='profile__input-text'>
                                E-mail
                            </label>
                            <input 
                                className='profile__input'
                                id='email'
                                required
                                type='email'
                                placeholder='email'
                                name='email-profile'
                            />
                        </div>
                        <button className='button profile__edit-button' type='submit'>Редактировать</button>
                        <button className='button profile__exit-button' type='submit' onClick={() => navigate('/')}>Выйти из аккаунта</button>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Profile
import './Profile.css';
import Header from '../Header/Header.js';

function Profile(){
    return(
        <section className='profile'>
            <Header/>
            <div className='profile__container'>
                <h2 className='profile__hello'>Привет, Всеволод!</h2>
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
                    <button className='button profile__exit-button' type='submit'>Выйти из аккаунта</button>
                </form>
            </div>
        </section>
    )
}

export default Profile
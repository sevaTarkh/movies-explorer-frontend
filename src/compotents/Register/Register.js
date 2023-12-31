import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import logo from '../../images/logoHeader.svg';
import './Register.css';

const Register = ({registerUser}) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleChange = (e) =>{
        const input = e.target;
        setForm({
            ...form,
            [input.name]: input.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        registerUser(form)
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
                <form className='register__form' onSubmit={handleSubmit}>
                    <label className='register__form-text'>Имя</label>
                    <input
                        className='popup-field'
                        placeholder='name'
                        id='name'
                        required
                        name='name'
                        type='text'
                        value={form.name}
                        onChange={handleChange}
                        minLength={2}
                        maxLength={15}
                    />
                    <label className='register__form-text'>E-mail</label>
                    <input
                        className='popup-field'
                        placeholder='email'
                        id='email'
                        required
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                    <label className='register__form-text'>Пароль</label>
                    <input
                        className='popup-field'
                        placeholder='Пароль'
                        id='password'
                        required
                        name='password'
                        type='password'
                        value={form.password}
                        onChange={handleChange}
                        minLength={2}
                        maxLength={15}
                    />
                    <span className='register__error'>Что-то пошло не так...</span>
                    <button type='submit' className='button register__button' onClick={() => navigate('/signin')}>Зарегестрироваться</button>
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
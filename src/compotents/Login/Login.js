import React, {useState} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logoHeader.svg';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({loginUser}) =>{
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) =>{
        const input = e.target;
        setForm({
            ...form,
            [input.name]: input.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        loginUser(form)
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
                <form className='login__form' onSubmit={handleSubmit}>
                    <label className='login__form-text'>email</label>
                    <input
                        className='popup__field'
                        placeholder='email'
                        id='email'
                        required
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                    <label className='login__form-text'>Пароль</label>
                    <input
                        className='popup__field'
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
                    <button type='submit' className='button login__button' onClick={() => navigate('/movies')}>Войти</button>
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
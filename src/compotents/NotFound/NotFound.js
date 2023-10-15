import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound(){
    const navigate = useNavigate()
    
    function goBack(){
        navigate(-1)
    }
    return(
        <main className="notfound">
            <h1 className="notfound__title">404</h1>
            <p className="notfound__text">Страница не найдена</p>
            <p className="link notfound__button" onClick={goBack}>
              Назад
            </p>
        </main>
    )
}

export default NotFound;
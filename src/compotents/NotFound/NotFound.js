import './NotFound.css';

function NotFound(){
    return(
        <section className="notfound">
            <h2 className="notfound__title">404</h2>
            <p className="notfound__text">Страница не найдена</p>
            <button className=" link notfound__button">Назад</button>
        </section>
    )
}

export default NotFound;
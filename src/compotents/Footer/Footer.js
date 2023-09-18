import './Footer.css';

function Footer(){
    return(
        <section className='footer'>
            <h4 className='footer__title'>Учебный проект Яндекс. Практикум х BeatFilm.</h4>
            <div className='footer__container'>
                <p className='footer__text footer__text-decoration'>&copy; 2023</p>
                <nav className='footer__navigation'>
                    <a className='link footer__text footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
                    <a className='link footer__text footer__link' href='https://github.com/sevaTarkh' target='_blank' rel="noreferrer">Github</a>
                </nav>
            </div>
        </section>
    )
}

export default Footer;

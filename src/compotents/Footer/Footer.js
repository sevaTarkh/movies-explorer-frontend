import './Footer.css';

function Footer(){
    return(
        <footer className='footer'>
            <h4 className='footer__title'>Учебный проект Яндекс. Практикум х BeatFilm.</h4>
            <div className='footer__container'>
                <p className='footer__text footer__text-decoration'>&copy; 2023</p>
                <ul className='footer__navigation'>
                    <li className='footer__nav-link'>
                        <a className='link footer__text footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className='footer__nav-link'>
                        <a className='link footer__text footer__link' href='https://github.com/sevaTarkh' target='_blank' rel="noreferrer">
                            Github
                        </a>
                    </li>
                    
                    
                </ul>
            </div>
        </footer>
    )
}

export default Footer;

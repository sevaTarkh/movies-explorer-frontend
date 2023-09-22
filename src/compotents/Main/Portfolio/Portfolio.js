import './Portfolio.css';
import arrow from '../../../images/arrow.svg';

function Portfolio(){
    return(
        <section className='portfolio'>
            <div className='portfolio__container'>
                <h2 className='portfolio__titile'>Портфолио</h2>
                <ul className='portfolio__navigation'>
                    <li className='portfolio__project'>
                        <a className='link portfolio__link' href='https://sevatarkh.github.io/how-to-learn/' target='_blank' rel="noreferrer">
                            <p className='portfolio__text'>Статичный сайт</p>
                            <img className='portfolio__arrow' alt='фото стрелы' src={arrow}/>
                        </a>
                    </li>
                    <li className='portfolio__project'>
                        <a className='link portfolio__link' href='https://sevatarkh.github.io/russian-travel/' target='_blank' rel="noreferrer">
                            <p className='portfolio__text'>Адаптивный сайт</p>
                            <img className='portfolio__arrow' alt='фото стрелы' src={arrow}/>
                        </a>
                    </li>
                    <li className='portfolio__project'>
                        <a className='link portfolio__link' href='https://sevatarkh.github.io/mesto/' target='_blank' rel="noreferrer">
                            <p className='portfolio__text'>Одностраничное приложение</p>
                            <img className='portfolio__arrow' alt='фото стрелы' src={arrow}/>
                        </a>
                    </li>
                </ul>
            </div>    
        </section>
    )
}

export default Portfolio;
import './AboutMe.css';
import seva from '../../../images/seva.jpg'

function AboutMe(){
    return(
        <section className='aboutme' id='student'>
            <div className='aboutme__box'>
                <h2 className='title title-container'>Студент</h2>
                <div className='aboutme__container'>
                    <div className='aboutme__container-text'>
                        <h3 className='aboutme__subtitle'>Всеволод</h3>
                        <h4 className='aboutme__subtitle-about'>Фронтенд-разработчик, 22 года</h4>
                        <p className='aboutme__text'>
                            Я живу в Москве, закончил факультет комплексной безопаснотси ТЭК.
                            Я люблю заниматься спортом и слушать музыку. В 23 году оканчиваю курсы по
                            веб-разработке. Моя метча - создать новый поисковик.
                        </p>
                        <a className='link aboutme__link' href='https://github.com/sevaTarkh' target='_blank' rel="noreferrer">Github</a>
                    </div>
                    <img alt='фото Севчика' className='aboutme__foto' src={seva}/>
                </div>
            </div>
        </section>
    )
}

export default AboutMe;
import './Techs.css';

function Techs(){
    return(
        <section className='techs' id='technologies'>
            <div className='techs__box'>
                <h2 className='about__title section-title'>Технологии</h2>
                <h3 className='techs__subtitle'>7 технологий</h3>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className='techs__container'>
                    <div className='techs__container-element'>
                        <p className='techs__container-element-text'>HTML</p>
                    </div>
                    <div className='techs__container-element'>
                        <p className='techs__container-element-text'>CSS</p>
                    </div>
                    <div className='techs__container-element'>
                        <p className='techs__container-element-text'>JS</p>
                    </div><div className='techs__container-element'>
                        <p className='techs__container-element-text'>React</p>
                    </div><div className='techs__container-element'>
                        <p className='techs__container-element-text'>Git</p>
                    </div><div className='techs__container-element'>
                        <p className='techs__container-element-text'>Express.js</p>
                    </div><div className='techs__container-element'>
                        <p className='techs__container-element-text'>mongoDB</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Techs;
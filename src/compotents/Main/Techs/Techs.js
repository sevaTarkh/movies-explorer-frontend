import './Techs.css';

function Techs(){
    return(
        <section className='techs' id='technologies'>
            <div className='techs__box'>
                <h2 className='title title-container'>Технологии</h2>
                <h3 className='techs__subtitle'>7 технологий</h3>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__container'>
                    <li className='techs__container-element'>
                        <p className='techs__container-element-text'>HTML</p>
                    </li>
                    <li className='techs__container-element'>
                        <p className='techs__container-element-text'>CSS</p>
                    </li>
                    <li className='techs__container-element'>
                        <p className='techs__container-element-text'>JS</p>
                    </li>
                    <li className='techs__container-element'>
                        <p className='techs__container-element-text'>React</p>
                    </li>
                    <li className='techs__container-element'>
                        <p className='techs__container-element-text'>Git</p>
                    </li>
                    <li className='techs__container-element'>
                        <p className='techs__container-element-text'>Express.js</p>
                    </li>
                    <li className='techs__container-element'>
                        <p className='techs__container-element-text'>mongoDB</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;
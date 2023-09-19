import './AboutProject.css'

function AboutProject(){
    return(
        <section className='about' id='project'>
            <div className='about__container'>
                <h2 className='title title__container'>О проекте</h2>
                <div className='about__project'>
                    <h3 className='order about__project-title'>Дипломный проект включал 5 этапов</h3>
                    <h3 className='about__project-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='order-text about__project-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    <p className='about__project-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
                <div className='about__time'>
                    <div className='about__time-text about__time-container'>1 неделя</div>
                    <div className='about__time-text'>4 неделя</div>
                    <div className='about__time-end'>Back-end</div>
                    <div className='about__time-end'>Front-end</div>
                </div>
            </div>
        </section>
    );  
}

export default AboutProject;
import './NavTab.css'


function NavTab(){

    return(
        <section className='nav'>
            <div className='nav__links'>
                <a href='#project' className='link nav__link'>О проекте</a>
                <a href='#technologies' className='link nav__link'>Технологии</a>
                <a href='#student' className='link nav__link'>Студент</a>
            </div>
        </section>
    )
}

export default NavTab;
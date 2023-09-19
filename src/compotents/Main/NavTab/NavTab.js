import './NavTab.css'


function NavTab(){

    return(
        <section className='nav'>
            <nav className='nav__links'>
                <a href='#project' className='link nav__link'>О проекте</a>
                <a href='#technologies' className='link nav__link'>Технологии</a>
                <a href='#student' className='link nav__link'>Студент</a>
            </nav>
        </section>
    )
}

export default NavTab;
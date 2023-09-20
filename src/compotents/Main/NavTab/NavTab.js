import './NavTab.css'


function NavTab(){
    return(
        <section className='nav'>
            <nav className='nav__container'>
                <ul className='nav__links'>
                    <li className='nav__element'>
                        <a href='#project' className='link nav__link'>О проекте</a>
                    </li>
                    <li className='nav__element'>
                        <a href='#technologies' className='link nav__link'>Технологии</a>
                    </li>
                    <li className='nav__element'>
                        <a href='#student' className='link nav__link'>Студент</a>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default NavTab;
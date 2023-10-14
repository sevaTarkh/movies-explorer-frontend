import './Main.css';
import Promo from './Promo/Promo.js';
import NavTab from './NavTab/NavTab.js';
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js'

function Main(){
    return(
        <>
            <Header/>
            <main className='content'>
                <Promo/>
                <NavTab/>
                <AboutProject/>
                <Techs/>
                <AboutMe/>
                <Portfolio/>
            </main>
            <Footer/>
        </>
    )
}

export default Main;



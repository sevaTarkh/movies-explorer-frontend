import './Promo.css'
import pi from '../../../images/Pi.svg'

function Promo(){
    return(
        <section className='promo'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__image' alt='фото буквы П' src={pi}/>
        </section>
    )
}

export default Promo;
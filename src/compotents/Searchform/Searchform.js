import './Searchform.css';
import lypa from '../../images/lypa.svg';


function Searchform(){
    return(
        <section className='search'>
            <form className='search__form'>
                <div className='search__input-container'>
                    <img className='search__icon' alt='лупа' src={lypa}/>
                    <div className='search__form-container'>
                        <input
                            className='search__input'
                            id='search-film'
                            placeholder='Фильмы'
                            required
                        />   
                        <button type='submit' className='button search__button'>Найти</button>
                    </div>
                </div>
                    <div className='search__filter-container'>
                        <label className='link search__input-switch'>
                            <input
                                type='checkbox'
                                className='search__input-checkbox'
                            />
                            <span className='slider round'/>
                        </label>
                        <p className='search__text'>
                            Короткометражки
                        </p>
                    </div>
            </form>      
        </section>
    )
}

export default Searchform;